import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ModernNavbar from './components/ModernNavbar';
import ModernHome from './components/ModernHome';
import About from './components/About';
import Flavors from './components/Flavors';
import Contact from './components/Contact';
import Hours from './components/Hours';
import Donations from './components/Donations';
import './App.css';

function App() {
  return (
    <div className="App">
      <ModernNavbar />
      <Routes>
        <Route path="/" element={<ModernHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/flavors" element={<Flavors />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hours" element={<Hours />} />
        <Route path="/donations" element={<Donations />} />
      </Routes>
    </div>
  );
}

export default App;
