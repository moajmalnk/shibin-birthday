import React from 'react';
import Navbar from './Navbar';
import './Layout.css';

const Footer = () => (
  <footer className="footer">
    <div className="footer-container">
      <p>© 2026 Shibin's Birthday Celebration. Built with ❤️ by Antigravity.</p>
    </div>
  </footer>
);

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
