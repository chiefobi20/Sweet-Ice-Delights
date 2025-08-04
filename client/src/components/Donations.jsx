import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Donations = () => {
  const [selectedAmount, setSelectedAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    name: '',
    email: '',
    message: ''
  });

  const predefinedAmounts = [10, 25, 50, 100, 250, 500];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount('');
  };

  const handleInputChange = (e) => {
    setDonorInfo({
      ...donorInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = selectedAmount || customAmount;
    console.log('Donation submission:', { amount, donorInfo });
    // Here you would integrate with a payment processor
    alert(`Thank you for your $${amount} donation!`);
  };

  return (
    <div className="donations min-h-screen py-16">
      <div className="container max-w-6xl mx-auto px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            Support Sweet Ice Delights 💝
          </h1>
          <img 
            src="/src/assets/high cam asorted flavors.JPG" 
            alt="Community Support" 
            className="donations-image mx-auto mb-6"
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '15px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)'
            }}
          />
          <p className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Help us continue bringing joy to our community with authentic Italian ice. 
            Your donations support local events, community programs, and help us serve those in need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-pink-200">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
              <span className="text-pink-500 mr-3">🎁</span>
              Make a Donation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Amount Selection */}
              <div>
                <label className="block text-gray-700 font-medium mb-3">Select Amount</label>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {predefinedAmounts.map(amount => (
                    <button
                      key={amount}
                      type="button"
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-3 rounded-lg border-2 font-semibold transition ${
                        selectedAmount === amount
                          ? 'border-pink-500 bg-pink-50 text-pink-600'
                          : 'border-gray-200 hover:border-pink-300'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full pl-8 pr-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                    min="1"
                  />
                </div>
              </div>

              {/* Donor Information */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Name (Optional)</label>
                <input
                  type="text"
                  name="name"
                  value={donorInfo.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Email (Optional)</label>
                <input
                  type="email"
                  name="email"
                  value={donorInfo.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Message (Optional)</label>
                <textarea
                  name="message"
                  value={donorInfo.message}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 resize-none"
                  placeholder="Leave a message of support..."
                />
              </div>

              <button
                type="submit"
                disabled={!selectedAmount && !customAmount}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-pink-600 hover:to-pink-700 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                Donate ${selectedAmount || customAmount || '0'}
              </button>
            </form>
          </div>

          {/* Impact Information */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-pink-100 to-pink-200 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4 text-pink-600">Your Impact</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="text-pink-500 mr-3 text-xl">🍧</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">$10 - Community Treats</h4>
                    <p className="text-gray-700">Provides free Italian ice for local children's events</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-pink-500 mr-3 text-xl">🎉</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">$25 - Event Sponsorship</h4>
                    <p className="text-gray-700">Helps sponsor local festivals and community gatherings</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-pink-500 mr-3 text-xl">❤️</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">$50 - Senior Support</h4>
                    <p className="text-gray-700">Provides treats for senior centers and care facilities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-pink-500 mr-3 text-xl">🏫</span>
                  <div>
                    <h4 className="font-semibold text-gray-800">$100+ - School Programs</h4>
                    <p className="text-gray-700">Supports educational visits and fundraising events</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-pink-200">
              <h3 className="text-xl font-bold mb-3 text-gray-800">Why Donate?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center">
                  <span className="text-pink-500 mr-2">✓</span>
                  Support local community events
                </li>
                <li className="flex items-center">
                  <span className="text-pink-500 mr-2">✓</span>
                  Help families in need enjoy treats
                </li>
                <li className="flex items-center">
                  <span className="text-pink-500 mr-2">✓</span>
                  Preserve Italian ice traditions
                </li>
                <li className="flex items-center">
                  <span className="text-pink-500 mr-2">✓</span>
                  Build stronger community bonds
                </li>
              </ul>
            </div>

            <div className="text-center">
              <p className="text-gray-600 mb-4">Have questions about donations?</p>
              <Link 
                to="/contact" 
                className="inline-block bg-white text-pink-600 px-6 py-3 rounded-full font-semibold border-2 border-pink-200 hover:bg-pink-50 transition"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donations;