import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ModernNavbar from './components/ModernNavbar';
import ModernHome from './components/ModernHome';
import About from './components/About';
import Contact from './components/Contact';
import Hours from './components/Hours';
import './App.css';

function App() {
  return (
    <div className="App">
      <ModernNavbar />
      <Routes>
        <Route path="/" element={<ModernHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/hours" element={<Hours />} />
      </Routes>
    </div>
  );
}

export default App;
