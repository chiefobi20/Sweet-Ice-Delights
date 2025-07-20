import { Routes, Route } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
import About from './About'
import Flavors from './Flavors'
import Hours from './Hours'
import Contact from './Contact'
import backgroundImage from '../assets/italian-ice-bg-3.jpg'
import '../App.css'

function App() {
  return (
    <div
      className="App min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/flavors" element={<Flavors />} />
          <Route path="/hours" element={<Hours />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
