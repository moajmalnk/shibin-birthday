import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PartyPopper, Calendar, MapPin } from 'lucide-react';
import Button from '../components/common/Button';
import './Home.css';

const Countdown = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown-grid">
      {Object.entries(timeLeft).map(([label, value]) => (
        <div key={label} className="countdown-item card">
          <span className="countdown-value">{value}</span>
          <span className="countdown-label">{label.toUpperCase()}</span>
        </div>
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="grid-container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="badge glass">
              <PartyPopper size={16} />
              <span>You're Invited!</span>
            </div>
            <h1 className="hero-title">
              Celebrating <span className="text-primary">Shibin's</span> 25th Birthday
            </h1>
            <p className="hero-subtitle">
              Join us for an evening of joy, laughter, and unforgettable memories as we celebrate another year of greatness!
            </p>
            
            <div className="event-details">
              <div className="detail-item">
                <Calendar className="text-primary" />
                <div>
                  <p className="detail-label">When</p>
                  <p className="detail-value">Saturday, May 15th @ 7:00 PM</p>
                </div>
              </div>
              <div className="detail-item">
                <MapPin className="text-primary" />
                <div>
                  <p className="detail-label">Where</p>
                  <p className="detail-value">The Grand Pavilion, Downtown</p>
                </div>
              </div>
            </div>

            <div className="hero-actions">
              <Button onClick={() => window.location.href = '/rsvp'}>RSVP Now</Button>
              <Button variant="glass" onClick={() => window.location.href = '/gallery'}>View Gallery</Button>
            </div>
          </motion.div>

          <motion.div 
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="hero-card-wrapper">
              <div className="shibin-image-container card glass">
                <img src="/shibin.jpg" alt="Shibin" className="shibin-photo" />
              </div>
              <div className="countdown-wrapper">
                <h3 className="countdown-title">Counting down to the big day...</h3>
                <Countdown targetDate="2026-05-15T19:00:00" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
