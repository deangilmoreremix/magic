/**
 * Header Component - Fixed navigation with scroll behavior
 */

import { useState } from 'react';
import './Header.css';

const Header = ({ isScrolled }: { isScrolled: boolean }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`header ${isScrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-content">
        <a href="/" className="header-logo">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <path d="M16 4L28 10V22L16 28L4 22V10L16 4Z" fill="url(#logo-gradient)" />
            <path d="M16 8L24 12V20L16 24L8 20V12L16 8Z" fill="white" fillOpacity="0.3" />
            <defs>
              <linearGradient id="logo-gradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FF6B4A" />
                <stop offset="1" stopColor="#2DD4BF" />
              </linearGradient>
            </defs>
          </svg>
          <span className="logo-text">Magic</span>
        </a>

        <nav className={`header-nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
          <a href="#products" className="nav-link">Products</a>
          <a href="#solutions" className="nav-link">Solutions</a>
          <a href="#pricing" className="nav-link">Pricing</a>
          <a href="#about" className="nav-link">About</a>
        </nav>

        <div className="header-actions">
          <button className="btn btn-ghost">Sign In</button>
          <button className="btn btn-primary">Get Started</button>
        </div>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;