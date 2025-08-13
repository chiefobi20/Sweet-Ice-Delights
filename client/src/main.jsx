import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import 'animate.css';
import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init({
  duration: 800,
  once: false,
  mirror: true,
  easing: 'ease-in-out',
  delay: 100,
  anchorPlacement: 'top-bottom',
  mobile: true,
  startEvent: 'DOMContentLoaded',
  throttleDelay: 99,
  offset: 120,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
