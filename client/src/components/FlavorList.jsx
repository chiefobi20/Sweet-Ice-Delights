import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FlavorList({ limit, showViewAll = false }) {
  const [flavors, setFlavors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default images for flavors - better frozen treat images
  const flavorImages = {
    "Cherry": "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop", // Cherry popsicle
    "Blue Raspberry": "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop", // Blue ice cream
    "Lemon": "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&h=300&fit=crop", // Lemon sorbet
    "Orange": "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?w=400&h=300&fit=crop", // Orange popsicle
    "Grape": "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=400&h=300&fit=crop", // Purple ice cream
    "Strawberry": "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=300&fit=crop" // Strawberry ice cream
  };

  useEffect(() => {
    const fetchFlavors = async () => {
      try {
        console.log('Fetching flavors from /api/flavors...');

        const response = await fetch('/api/flavors', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        console.log('Response status:', response.status);

        if (!response.ok) {
          const errorText = await response.text();
          console.error('Response error:', errorText);
          throw new Error(`Server error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Received flavors:', data);

        if (!Array.isArray(data)) {
          throw new Error(`Invalid data format: expected array, got ${typeof data}`);
        }

        // Add images to flavors
        const flavorsWithImages = data.map(flavor => ({
          ...flavor,
          image: flavorImages[flavor.name] || "https://images.unsplash.com/photo-1488900128323-21503983a07e"
        }));

        const displayFlavors = limit ? flavorsWithImages.slice(0, limit) : flavorsWithImages;
        setFlavors(displayFlavors);
        setError(null);

      } catch (err) {
        console.error('Fetch error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFlavors();
  }, [limit]);

  if (loading) {
    return (
      <div className="min-h-screen py-10 px-6">
        <div className="bg-black/70 backdrop-blur-md rounded-xl p-8 border-2 border-white/20 shadow-2xl max-w-4xl mx-auto">
          <div className="loading text-center">
            <p className="text-xl text-white">Loading delicious flavors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen py-10 px-6">
        <div className="bg-black/70 backdrop-blur-md rounded-xl p-8 border-2 border-white/20 shadow-2xl max-w-4xl mx-auto">
          <div className="error text-center">
            <p className="text-xl text-white mb-4">Error loading flavors: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (flavors.length === 0) {
    return (
      <div className="min-h-screen py-10 px-6">
        <div className="bg-black/70 backdrop-blur-md rounded-xl p-8 border-2 border-white/20 shadow-2xl max-w-4xl mx-auto">
          <div className="no-flavors text-center">
            <p className="text-xl text-white">No flavors available at this time.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="bg-black/70 backdrop-blur-md rounded-xl p-8 border-2 border-white/20 shadow-2xl max-w-6xl mx-auto">
        {!limit && (
          <div className="page-header text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-200 mb-4">Our Delicious Flavors 🍧</h1>
            <p className="text-lg text-gray-300 font-medium">Choose from our selection of authentic Italian ice flavors</p>
          </div>
        )}

        {limit && (
          <h2 className="text-4xl font-bold text-center mb-8 text-gray-200">
            Featured Flavors 🍧
          </h2>
        )}

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-4xl">
            {flavors.map(flavor => (
              <div key={flavor.id} className={`flavor-card bg-white rounded-xl shadow-lg overflow-hidden max-w-xs w-full hover:shadow-xl transition-all duration-300 ${!flavor.available && !limit ? 'opacity-90' : ''}`}>
                <div className="flavor-image relative">
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className={`w-full h-20 object-cover transition-all duration-300 ${!flavor.available && !limit ? 'grayscale' : ''}`}
                  />
                  {!flavor.available && !limit && (
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-800/70 to-gray-900/70 flex items-center justify-center">
                      <div className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold tracking-wide">
                        TEMPORARILY UNAVAILABLE
                      </div>
                    </div>
                  )}
                </div>
                <div className="flavor-content p-4">
                  {limit ? (
                    // Simplified home page version - just name
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-800 tracking-wide">
                        {flavor.name}
                      </h3>
                    </div>
                  ) : (
                    // Full flavor page version with all details
                    <>
                      <div className="flex justify-between items-start mb-3">
                        <h3 className={`text-lg font-semibold tracking-wide ${flavor.available ? 'text-gray-700' : 'text-gray-500'}`}>
                          {flavor.name}
                        </h3>
                        <div className={`px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border ${
                          flavor.available
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                            : 'bg-gray-50 text-gray-500 border-gray-200'
                        }`}>
                          {flavor.available ? 'In Stock' : 'Out of Stock'}
                        </div>
                      </div>
                      <p className={`flavor-description mb-4 text-sm leading-relaxed ${flavor.available ? 'text-gray-600' : 'text-gray-400'}`}>
                        {flavor.description}
                      </p>
                      <div className="flavor-footer flex justify-between items-center pt-2 border-t border-gray-100">
                        <span className={`price text-xl font-bold tracking-tight ${flavor.available ? 'text-pink-500' : 'text-gray-400'}`}>
                          ${(flavor.price_cents / 100).toFixed(2)}
                        </span>
                        {flavor.available ? (
                          <div className="flex items-center text-emerald-600 text-sm font-medium">
                            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full mr-2 animate-pulse"></div>
                            Available Now
                          </div>
                        ) : (
                          <div className="flex items-center text-gray-500 text-sm font-medium">
                            <div className="w-2.5 h-2.5 bg-gray-400 rounded-full mr-2"></div>
                            Check Back Soon
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {showViewAll && (
          <div className="view-all-section text-center mt-8">
            <Link
              to="/flavors"
              className="view-all-btn bg-pink-600 text-white px-8 py-3 rounded-lg hover:bg-pink-700 transition-colors inline-block font-medium"
            >
              View All Flavors →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default FlavorList;
