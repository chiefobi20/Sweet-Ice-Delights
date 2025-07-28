import React from 'react';
import '../App.css';

const Flavors = () => {
  const flavors = [
    { id: 1, name: "Sicilian Lemon", description: "Fresh Mediterranean lemons", image: "/assets/Sicillian Lemon.JPG" },
    { id: 2, name: "Pistachio Cream", description: "Rich Sicilian pistachios", image: "/assets/Pistachio Cream.JPG" },
    { id: 3, name: "Blood Orange", description: "Sweet Sicilian blood oranges", image: "/assets/Blood Orange.JPG" },
    { id: 4, name: "Vanilla Bean", description: "Madagascar vanilla beans", image: "/assets/Vanilla Bean.JPG" },
    { id: 5, name: "Seaside Swirl", description: "Ocean-inspired chocolate blend", image: "/assets/Seaside Swirl (Chocolate Noir replacement.JPG" },
    { id: 6, name: "Cotton Candy", description: "Nostalgic carnival sweetness", image: "/assets/Cotton Candy.JPG" }
  ];

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="bg-black/70 backdrop-blur-md rounded-xl p-8 border-2 border-white/20 shadow-2xl max-w-6xl mx-auto">
        <div className="page-header text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-200 mb-4">Our Delicious Flavors 🍧</h1>
          <p className="text-lg text-gray-300 font-medium">Choose from our selection of authentic Italian ice flavors</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
          {flavors.map(flavor => (
            <div
              key={flavor.id}
              className="flavor-card bg-white rounded-xl shadow-lg overflow-hidden w-full"
            >
              <div className="flavor-image relative">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-cover transition-all duration-300"
                    style={{ aspectRatio: '1', height: '250px' }}
                  />
                </div>
              </div>
              <div className="flavor-content p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800 tracking-wide mb-2">
                  {flavor.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {flavor.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flavors;
