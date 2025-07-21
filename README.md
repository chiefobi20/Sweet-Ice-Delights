# Sweet Ice Delights

A modern, full-stack web application for an Italian ice shop featuring a React frontend and Flask backend.

## Features

- **Interactive Flavor Menu** - Browse authentic Italian ice flavors with real-time availability
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Contact System** - Email contact form with backend integration
- **Store Hours & Location** - Easy access to business information
- **Admin Dashboard** - Manage flavors and availability (backend)
- **Modern UI/UX** - Glass morphism design with sleek animations

## Tech Stack

### Frontend
- **React 19.1.0** - Modern UI library
- **React Router DOM** - Client-side routing
- **Vite** - Fast build tool and dev server
- **CSS3** - Custom styling with glass morphism effects
- **ESLint** - Code linting and formatting

### Backend
- **Flask** - Python web framework
- **SQLAlchemy** - Database ORM
- **Flask-CORS** - Cross-origin resource sharing
- **SQLite** - Lightweight database
- **Email Integration** - Contact form functionality

## Project Structure

```
sweet-ice-delights/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── App.jsx         # Main app component
│   │   ├── main.jsx        # Entry point
│   │   ├── App.css         # Global styles
│   │   └── index.css       # Base styles
│   ├── public/             # Static assets
│   ├── package.json        # Frontend dependencies
│   └── vite.config.js      # Vite configuration
├── server/                 # Flask backend
│   ├── app.py              # Main Flask application
│   ├── config.py           # Database configuration
│   ├── models.py           # Database models
│   ├── setup_complete.py   # Database setup script
│   └── requirements.txt    # Python dependencies
└── README.md               # This file
```

## Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **Python** (v3.8 or higher)
- **npm** or **yarn**

### Installation

1. **Clone the repository & Activate Virtual Environment**
   ```bash
   git clone <repository-url>
   cd sweet-ice-delights
   source venv/bin/activate  # For Unix-based systems
   venv\Scripts\activate    # For Windows
   ```

2. **Setup Backend**
   ```bash
   cd server
   pip install -r requirements.txt
   python setup_complete.py
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the Backend Server**
   ```bash
   cd server
   python app.py
   ```
   Backend runs on: `http://localhost:5000`

2. **Start the Frontend Development Server**
   ```bash
   cd client
   npm run dev
   ```
   Frontend runs on: `http://localhost:3001`

## 📊 API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `GET /api/test` - Test endpoint
- `GET /api/flavors` - Get all available flavors
- `POST /api/contact` - Submit contact form

### Database Models
- **User** - Customer accounts
- **Flavor** - Italian ice flavors with pricing
- **Order** - Customer orders
- **OrderItem** - Individual order items

## Design Features

- **Glass Morphism UI** - Modern translucent design elements
- **Responsive Layout** - Mobile-first design approach
- **Professional Typography** - Clean, readable fonts
- **Color Scheme** - Pink and blue gradient themes
- **Smooth Animations** - Hover effects and transitions

## Development Tools

### Frontend Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm test         # Run tests
```

### Backend Utilities
```bash
python check_db.py        # Check database contents
python update_flavor.py   # Update flavor availability
```

## Pages

1. **Home** - Welcome page with featured flavors
2. **Flavors** - Complete flavor menu with pricing
3. **About** - Company story and values
4. **Hours** - Store hours and location
5. **Contact** - Contact form and information

## Deployment

### Frontend (Vite Build)
```bash
cd client
npm run build
# Deploy dist/ folder to your hosting service
```

### Backend (Flask)
- Configure production database
- Set environment variables
- Deploy to your preferred hosting platform

## Environment Variables

Create a `.env` file in the server directory:
```env
DATABASE_URL=sqlite:///app.db
SMTP_SERVER=your-smtp-server
SMTP_PORT=587
SENDER_EMAIL=your-email@example.com
SENDER_PASSWORD=your-password
RECIPIENT_EMAIL=business-email@example.com
```

## Test Data

The setup script creates sample data:
- **Test Users**: `testuser` / `admin`
- **Sample Flavors**: Cherry, Blue Raspberry, Lemon, Orange, Grape, Strawberry
- **Pricing**: $3.00 - $3.75 per serving

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.