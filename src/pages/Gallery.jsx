import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Skeleton from '../components/common/Skeleton';
import './Gallery.css';

const Gallery = () => {
  const [loading, setLoading] = useState(true);
  
  // Mock data for memories
  const memories = [
    { id: 1, title: 'Beach Trip 2024', date: 'Jan 12, 2024' },
    { id: 2, title: 'Concert Night', date: 'Mar 05, 2024' },
    { id: 3, title: 'Graduation Day', date: 'Jun 20, 2023' },
    { id: 4, title: 'Road Trip', date: 'Aug 15, 2024' },
    { id: 5, title: 'Birthday 2023', date: 'May 15, 2023' },
    { id: 6, title: 'Winter Gala', date: 'Dec 22, 2023' },
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="gallery-page">
      <div className="grid-container">
        <header className="page-header">
          <h1 className="page-title">Memory Gallery</h1>
          <p className="page-subtitle">A collection of moments we've shared over the years.</p>
        </header>

        <div className="gallery-grid">
          {loading ? (
            Array(6).fill(0).map((_, i) => (
              <div key={i} className="gallery-card">
                <Skeleton height="300px" />
                <div style={{ marginTop: '16px' }}>
                  <Skeleton width="60%" height="24px" />
                  <Skeleton width="40%" height="16px" />
                </div>
              </div>
            ))
          ) : (
            memories.map((memory, index) => (
              <motion.div 
                key={memory.id} 
                className="gallery-card card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="memory-image-container">
                  <img 
                    src={`https://picsum.photos/seed/${memory.id}/600/800`} 
                    alt={memory.title} 
                    className="memory-image" 
                  />
                  <div className="image-overlay">
                    <span className="image-date">{memory.date}</span>
                  </div>
                </div>
                <div className="memory-info">
                  <h3 className="memory-title">{memory.title}</h3>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
