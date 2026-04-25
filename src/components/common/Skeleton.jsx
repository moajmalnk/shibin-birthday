import React from 'react';
import './Skeleton.css';

const Skeleton = ({ 
  width, 
  height, 
  variant = 'rect', // rect, circle, text
  className = '' 
}) => {
  const style = {
    width: width || '100%',
    height: height || '20px',
  };

  return (
    <div 
      className={`skeleton skeleton-${variant} shimmer ${className}`} 
      style={style}
    />
  );
};

export default Skeleton;
