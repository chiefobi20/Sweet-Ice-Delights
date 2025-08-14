import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function About() {
  return (
    <div className="about">
      <div className="container max-w-6xl mx-auto px-8 py-16">
        <section className="about-hero mb-16">
          <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent" style={{ color: 'lightblue', fontStyle: 'italic', fontWeight: 'bold' }}>
            About Sweet Ice Delights
          </h1>
          <p className="text-xl text-center text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Sweet Ice Delights was created in August of 2016 right here in Atlanta, with one cooler, a handful of fresh fruit, and a promise to keep things simple and honest.
          </p>
        </section>

        <section className="about-story mb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Story</h2>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                The owner of Sweet Ice Delights grew up around block parties, ball games, and church picnics where a cold cup of Italian ice could turn a hot day around. After years of sharing homemade recipes with family and friends, she decided to bring that same happiness to the whole Atlanta community. Today, we still make our ices in small batches, using real fruit, pure cane sugar, and filtered water—no shortcuts, ever. Most of our flavors are dairy-free and vegan so everyone can dig in.
              </p>
            </div>
            <div className="What Makes Us Special">
              <h3 className="text-2xl font-bold mb-4 text-pink-600">What Makes Us Special</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every scoop tells a story of passion, tradition, and the finest ingredients sourced from around the Mediterranean. We believe that great Italian ice isn't just about taste—it's about creating moments of joy and bringing families together.
              </p>
              <br />
              <ul className="space-y-3 text-gray-700" style={{ color: 'lightblue', fontStyle: 'italic', fontWeight: 'bold', fontSize: '25px' }}>
                <li className="flex items-center"><span className="text-pink-500 mr-3">🍧</span> Small-batch Italian ice made fresh daily</li>
                <li className="flex items-center"><span className="text-pink-500 mr-3">🍓</span> Fresh, natural ingredients</li>
                <li className="flex items-center"><span className="text-pink-500 mr-3">👨‍👩‍👧‍👦💛</span>  Proudly serving Atlanta schools, teams, and local events</li>
                <li className="flex items-center"><span className="text-pink-500 mr-3">⭐</span> Fan favorites: Mango Sunrise, Strawberry Lemonade, Blue Raspberry, Pineapple Paradise, Cherry Bliss, Watermelon Wave</li>
              </ul>
              <br />
              <h2>Planning an event? From kids’ parties to corporate summer events we bring the cart, the smiles, and <span style={{ color: 'lightblue', fontStyle: 'italic', fontWeight: 'bold' }}>the chill</span>.</h2>
              <Link to="/contact" style={{ color: 'purple', textDecoration: 'underline', fontWeight: 'bold' }}>Contact us</Link> to learn more.
            </div>
          </div>

          <div className="container">
            <div className="about-content" style={{ background: 'none' }}>
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
            <br />
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
