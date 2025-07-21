import 'animate.css';
import 'aos/dist/aos.css';
import AOS from 'aos';
import { Link } from 'react-router-dom'
import FlavorList from './FlavorList'
import '../App.css'

AOS.init({
  duration: 800,      // Animation duration in ms
  once: false,        // Animation fires every time on scroll
  mirror: true,       // Animate out while scrolling past
  easing: 'ease-in-out', // Animation easing
  delay: 100,        // Delay before animation starts in ms
  anchorPlacement: 'top-bottom', // Anchor placement for animation
  mobile: true,       // Enable animations on mobile devices
  startEvent: 'DOMContentLoaded', // Event to start animations
  throttleDelay: 99,  // Throttle delay in ms
  offset: 120,        // Offset (in px) from the original trigger point

});

function Home() {
  return (
    <div className="home-page">
      <section className="hero min-h-screen flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-md p-8 rounded-xl text-center shadow-lg max-w-xl animate__animated animate__fadeInDown" data-aos="fade-down">
          <h1 className="text-4xl font-bold text-pink-600 mb-4">
            Welcome to Sweet Ice Delights
          </h1>
          <h4 className="text-gray-700 text-lg mb-6">
            Authentic Italian Ice Made Fresh Daily 🍧
          </h4>
        </div>
      </section>
      <br></br>

      <div className="container">
        <p className="text-gray-300 text-lg mb-8 leading-relaxed font-medium animate__animated animate__fadeIn" data-aos="fade-up" data-aos-delay="200">
                We bring you authentic Italian ice made with traditional recipes
                and the finest ingredients. Every batch is crafted with love and
                attention to detail.
        </p>
      </div>
      <br></br>

      <section className="featured-flavors py-16">
        <div className="container">
          <div className="bg-black/70 backdrop-blur-md rounded-xl p-8 border-2 border-white/20 shadow-2xl animate__animated animate__fadeInUp" data-aos="fade-up" data-aos-delay="400">
            <FlavorList limit={6} />
            <div className="view-all text-center mt-8">
              <Link to="/flavors" className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition font-semibold shadow-lg animate__animated animate__pulse" data-aos="zoom-in" data-aos-delay="600">
                View All Flavors
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-preview py-16">
        <div className="container">
          <div className="bg-black/70 backdrop-blur-md rounded-xl p-8 border-2 border-white/20 shadow-2xl animate__animated animate__fadeInUp" data-aos="fade-up" data-aos-delay="800">
            <div className="about-content text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-200 mb-6">About Sweet Ice Delights</h2>
              
              <Link to="/about" className="bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition font-semibold shadow-lg animate__animated animate__pulse" data-aos="zoom-in" data-aos-delay="1000">
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
