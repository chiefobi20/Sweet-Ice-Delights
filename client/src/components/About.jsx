import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function About() {
  return (
    <div className="about">
      <div className="container max-w-6xl mx-auto px-8 py-16">
        <section className="about-hero mb-16">
          <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            About Sweet Ice Delights
          </h1>
          <p className="text-xl text-center text-gray-700 max-w-4xl mx-auto leading-relaxed">
            For three generations, our family has been crafting authentic Italian ice using traditional methods passed down from our ancestors in Sicily.
          </p>
        </section>

        <section className="about-story mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                It all started in 1952 when our grandfather, Giuseppe Deluca, brought his family's secret gelato recipes from the hills of Sicily to America. What began as a small pushcart operation has grown into the beloved Sweet Ice Delights you know today.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every scoop tells a story of passion, tradition, and the finest ingredients sourced from around the Mediterranean. We believe that great Italian ice isn't just about taste—it's about creating moments of joy and bringing families together.
              </p>
            </div>
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-pink-600">What Makes Us Special</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center"><span className="text-pink-500 mr-3">🍧</span> Authentic Sicilian recipes</li>
                <li className="flex items-center"><span className="text-pink-500 mr-3">🌿</span> Fresh, natural ingredients</li>
                <li className="flex items-center"><span className="text-pink-500 mr-3">👨‍👩‍👧‍👦</span> Family-owned for 70+ years</li>
                <li className="flex items-center"><span className="text-pink-500 mr-3">❤️</span> Made with love daily</li>
              </ul>
            </div>
            
          </div>
            <div className="container">
    
        <div className="about-content" style={{background: 'none'}}>
          <img 
            src="/src/assets/About page image.JPG" 
            alt="About Sweet Ice Delights" 
            className="about-image"
            style={{
              width: '100%',
              maxWidth: '600px',
              height: 'auto',
              borderRadius: '15px',
              marginBottom: '2rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}
          />
          
        </div>
      </div>



        </section>

        <section className="about-cta text-center bg-gradient-to-r from-pink-500 to-pink-600 text-white p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Sweet Ice Delights?</h2>
          <p className="text-xl mb-8 opacity-90">
            Come visit us today or order online for pickup. We can't wait to serve you the most delicious Italian ice you've ever tasted!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/flavors" className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-pink-50 transition">
              View Our Flavors
            </Link>
            <Link to="/contact" className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-pink-600 transition">
              Get in Touch
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
