import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ModernNavbar.css';

gsap.registerPlugin(ScrollTrigger);

const ModernNavbar = () => {
  const navRef = useRef(null);
  const emojiRef = useRef(null);
  const companyNameRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    const nav = navRef.current;
    gsap.set(nav, { y: 0, opacity: 1 });

    // Check if store is open
    const checkStoreHours = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      
      // Store hours: Mon-Thu: 11am-9pm, Fri-Sun: 11am-11pm
      if (currentDay >= 1 && currentDay <= 4) { // Mon-Thu
        setIsOpen(currentHour >= 11 && currentHour < 21);
      } else { // Fri-Sun
        setIsOpen(currentHour >= 11 && currentHour < 23);
      }
    };

    checkStoreHours();
    const interval = setInterval(checkStoreHours, 60000); // Check every minute

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      clearInterval(interval);
    };
  }, []);

  const handleCompanyNameHover = () => {
    // Jiggle animation for emoji
    gsap.to(emojiRef.current, {
      rotation: 15,
      duration: 0.2,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut"
    });

    // Bubble pop animation for both company name and emoji
    gsap.to([companyNameRef.current, emojiRef.current], {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  const handleCompanyNameLeave = () => {
    gsap.to([companyNameRef.current, emojiRef.current], {
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };

  const handleNightModeToggle = () => {
    setIsNightMode(!isNightMode);
    document.body.classList.toggle('night-mode', !isNightMode);
    
    // Toggle animation
    gsap.to('.night-mode-toggle', {
      rotation: isNightMode ? 0 : 180,
      duration: 0.5,
      ease: "back.out(1.7)"
    });
  };

  return (
    <nav className="modern-navbar" ref={navRef}>
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        
        <div className="nav-center">
          <Link 
            to="/" 
            className="nav-logo"
            onMouseEnter={handleCompanyNameHover}
            onMouseLeave={handleCompanyNameLeave}
          >
            <span className="emoji" ref={emojiRef}>🍧</span>
            <span className="company-name" ref={companyNameRef}>Sweet Ice Delights</span>
          </Link>
        </div>
        
        <div className="nav-right">
          <Link to="/flavors" className="nav-link">Flavors</Link>
          <Link to="/hours" className="nav-link">Hours</Link>
          <div className="status-indicator">
            <div className={`status-dot ${isOpen ? 'open' : 'closed'}`}></div>
            <span className="status-text">{isOpen ? 'Open' : 'Closed'}</span>
          </div>
          <button 
            className="night-mode-toggle"
            onClick={handleNightModeToggle}
            aria-label="Toggle night mode"
          >
            <span className="toggle-icon">🌙</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default ModernNavbar;
