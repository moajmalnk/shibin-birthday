import React, { useState } from 'react';
import './Button.css';

const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  isLoading = false, 
  disabled = false,
  className = '',
  ...props 
}) => {
  const [internalLoading, setInternalLoading] = useState(false);

  const handleClick = async (e) => {
    if (isLoading || internalLoading || disabled) return;
    
    if (onClick) {
      setInternalLoading(true);
      try {
        await onClick(e);
      } finally {
        setInternalLoading(false);
      }
    }
  };

  const activeLoading = isLoading || internalLoading;

  return (
    <button
      type={type}
      className={`btn btn-${variant} ${activeLoading ? 'btn-loading' : ''} ${className}`}
      onClick={handleClick}
      disabled={disabled || activeLoading}
      {...props}
    >
      {activeLoading && <span className="spinner"></span>}
      <span className={activeLoading ? 'opacity-0' : ''}>{children}</span>
    </button>
  );
};

export default Button;
