/**
 * Product Showcase Component
 * Three product cards: Super Magic, Magic Flow, Magic IM
 */

import { motion } from 'framer-motion';
import './ProductShowcase.css';

const products = [
  {
    id: 'super-magic',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <path d="M16 2L19.5 12.5L28 14L21 22L23 30L16 26L9 30L11 22L4 14L12.5 12.5L16 2Z" 
          fill="url(#super-magic-gradient)" />
        <defs>
          <linearGradient id="super-magic-gradient" x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF6B4A"/>
            <stop offset="1" stopColor="#FF8F6B"/>
          </linearGradient>
        </defs>
      </svg>
    ),
    name: 'Super Magic',
    description: 'General-purpose AI Agent that understands, plans, and executes complex tasks autonomously.',
    accent: '#FF6B4A',
    link: '#',
  },
  {
    id: 'magic-flow',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="10" cy="16" r="4" fill="#2DD4BF"/>
        <circle cx="22" cy="10" r="4" fill="#2DD4BF"/>
        <circle cx="22" cy="22" r="4" fill="#2DD4BF"/>
        <path d="M14 16L18 12M18 12L22 10M14 16L18 20L22 22" stroke="#2DD4BF" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Magic Flow',
    description: 'Visual workflow builder for creating sophisticated AI pipelines without code.',
    accent: '#2DD4BF',
    link: '#',
  },
  {
    id: 'magic-im',
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="18" rx="3" stroke="#6366F1" strokeWidth="2"/>
        <path d="M8 14L16 20L24 14" stroke="#6366F1" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    name: 'Magic IM',
    description: 'Enterprise messaging with integrated AI assistants for knowledge management.',
    accent: '#6366F1',
    link: '#',
  },
];

const ProductShowcase = () => {
  return (
    <section className="product-showcase section">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2>Powerful AI Products</h2>
          <p>Everything you need to transform your business with artificial intelligence</p>
        </motion.div>

        <div className="grid grid-3">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              className="product-card card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              style={{ '--accent': product.accent } as React.CSSProperties}
            >
              <div className="product-icon">{product.icon}</div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <a href={product.link} className="product-link">
                Learn more
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;