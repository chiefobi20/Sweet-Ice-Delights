import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './ModernHome.css';

gsap.registerPlugin(ScrollTrigger);

const ModernHome = () => {
  const heroRef = useRef(null);
  const logoRef = useRef(null);
  const headlineRef = useRef(null);
  const ctaRef = useRef(null);
  const particlesRef = useRef(null);
  const sectionsRef = useRef([]);

  const featuredFlavors = [
    {
      id: 1,
      name: "Sicilian Lemon",
      description: "Fresh Mediterranean lemons",
      image: "/src/assets/Sicillian Lemon.JPG"
    },
    {
      id: 2,
      name: "Pistachio Cream",
      description: "Rich Sicilian pistachios",
      image: "/src/assets/Pistachio Cream.JPG"
    },
    {
      id: 3,
      name: "Blood Orange",
      description: "Sweet Sicilian blood oranges",
      image: "/src/assets/Blood Orange.JPG"
    },
    {
      id: 4,
      name: "Vanilla Bean",
      description: "Madagascar vanilla beans",
      image: "/src/assets/Vanilla Bean.JPG"
    },
    {
      id: 5,
      name: "Seaside Swirl",
      description: "Ocean-inspired chocolate blend",
      image: "/src/assets/Seaside Swirl (Chocolate Noir replacement.JPG"
    },
    {
      id: 6,
      name: "Cotton Candy",
      description: "Nostalgic carnival sweetness",
      image: "/src/assets/Cotton Candy.JPG"
    }
  ];

  useEffect(() => {
    // Hero entrance animations
    const tl = gsap.timeline();
    
    tl.from(logoRef.current, {
      duration: 1.5,
      y: 50,
      opacity: 1,
      ease: "power3.out"
    })
    .from(headlineRef.current, {
      duration: 1.2,
      y: 30,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.8")
    .from(ctaRef.current, {
      duration: 1,
      y: 20,
      opacity: 1,
      ease: "power2.out"
    }, "-=0.6");

    // Floating particles animation
    gsap.to(".particle", {
      duration: 20,
      rotation: 360,
      repeat: -1,
      ease: "none"
    });

    gsap.to(".particle", {
      duration: 8,
      y: "random(-50, 50)",
      x: "random(-30, 30)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5
    });

    // Section reveal animations
    sectionsRef.current.forEach((section, index) => {
      gsap.fromTo(section, 
        {
          y: 100,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax effects
    gsap.to(".parallax-bg", {
      yPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: ".parallax-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  return (
    <div className="modern-home">
      {/* Floating Particles Background */}
      <div className="particles-container" ref={particlesRef}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i}`}></div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="hero-section" ref={heroRef}>
        <div className="hero-content">
          <div className="logo-container" ref={logoRef}>
            <h1 className="hero-logo">Sweet Ice Delights</h1>
          </div>
          <div className="hero-text" ref={headlineRef}>
            <h2 className="hero-subtitle">Authentic Italian Ice Made Fresh Daily</h2>
            <p className="hero-description">Experience the finest gelato and Italian ice crafted with passion and tradition</p>
          </div>
          <div className="cta-container" ref={ctaRef}>
            <button className="cta-button">
              <span>Explore Flavors</span>
              <div className="button-glow"></div>
            </button>
          </div>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Featured Flavors Section */}
      <section className="section featured-section" ref={addToRefs}>
        <div className="container">
          <h2 className="section-title">Featured Flavors</h2>
          <div className="flavors-grid">
            {[
              { name: "Sicilian Lemon", image: "/src/assets/Sicillian Lemon.JPG", description: "Fresh Mediterranean lemons" },
              { name: "Pistachio Cream", image: "/src/assets/Pistachio Cream.JPG", description: "Rich Sicilian pistachios" },
              { name: "Blood Orange", image: "/src/assets/Blood Orange.JPG", description: "Sweet Tarocco oranges" },
              { name: "Vanilla Bean", image: "/src/assets/Vanilla Bean.JPG", description: "Madagascar vanilla pods" },
              { name: "Seaside Swirl", image: "/src/assets/Seaside Swirl (Chocolate Noir replacement.JPG", description: "Ocean-inspired berry blend" },
              { name: "Cotton Candy", image: "/src/assets/Cotton Candy.JPG", description: "Nostalgic carnival sweetness" }
            ].map((flavor, index) => (
              <div key={index} className="flavor-card" data-flavor={flavor.name}>
                <div className="flavor-image">
                  <img src={flavor.image} alt={flavor.name} />
                  <div className="flavor-overlay">
                    <h3>{flavor.name}</h3>
                    <p>{flavor.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax About Section */}
      <section className="section parallax-section" ref={addToRefs}>
        <div className="parallax-bg"></div>
        <div className="container">
          <div className="about-content">
            <h2 className="section-title">Our Story</h2>
            <p className="about-text">
              (DUMMY DATA) For three generations, our family has been crafting authentic Italian ice using traditional methods 
              passed down from our ancestors in Sicily. Every scoop tells a story of passion, tradition, and 
              the finest ingredients sourced from around the Mediterranean.
            </p>
          </div>
        </div>
      </section>

      {/* Location & Hours */}
      <section className="section info-section" ref={addToRefs} style={{ backgroundColor: 'aliceblue' }}>
        <div className="container">
          <div className="info-grid">
            <div className="info-card">
              <h3>Visit Us</h3>
              <p>123 Gelato Street<br />Powder Springs, GA 30127</p>
            </div>
            <div className="info-card">
              <h3>Hours</h3>
              <p>Mon-Thu: 11am-6pm<br />Fri-Sun: 11am-6pm</p>
            </div>
            <div className="info-card">
              <h3>Contact</h3>
              <p>(555) 123-GELATO<br />hello@sweeticedelights.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ModernHome;
