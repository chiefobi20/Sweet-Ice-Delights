import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Layout from './components/Layout.jsx'
import App from './components/App.jsx'
import FlavorList from './components/FlavorList.jsx'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Hours from './components/Hours.jsx'
import Login from './components/Login.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout><App /></Layout>,
  },
  {
    path: "/flavors",
    element: <Layout><FlavorList /></Layout>,
  },
  {
    path: "/about",
    element: <Layout><About /></Layout>,
  },
  {
    path: "/contact",
    element: <Layout><Contact /></Layout>,
  },
  {
    path: "/hours",
    element: <Layout><Hours /></Layout>,
  },
  {
    path: "/login",
    element: <Layout><Login /></Layout>,
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
