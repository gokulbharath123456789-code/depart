import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);

    const mockUsers = [
      { id: '1', name: 'Admin User', email: 'admin@store.com', isAdmin: true },
      { id: '2', name: 'Demo User', email: 'demo@example.com', isAdmin: false },
    ];

    const foundUser = mockUsers.find((u) => u.email === email);

    if (!foundUser || password.length < 6) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }

    localStorage.setItem('user', JSON.stringify(foundUser));
    setUser(foundUser);
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);

    if (password.length < 6) {
      setIsLoading(false);
      throw new Error('Password must be at least 6 characters');
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      isAdmin: false,
    };

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    setIsLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
