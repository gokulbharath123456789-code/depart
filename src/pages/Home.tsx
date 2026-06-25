import { useState } from 'react';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import FlashDeals from '../components/FlashDeals';
import ProductGrid from '../components/ProductGrid';
import Brands from '../components/Brands';
import TrustSection from '../components/TrustSection';
import products from '../data/products.json';

const Home = () => {
  const [searchQuery] = useState('');

  const filteredProducts = searchQuery
    ? products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : products;

  return (
    <div>
      <Hero />
      <CategoryGrid />
      <FlashDeals />
      <ProductGrid
        products={filteredProducts}
        title="All Products"
        subtitle="Discover our wide range of fresh products"
      />
      <Brands />
      <TrustSection />
    </div>
  );
};

export default Home;
