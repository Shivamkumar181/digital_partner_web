# Overview
Digital Partner is a comprehensive collaboration platform designed to connect project creators with contributors, enabling seamless project management, payment tracking, and real-time communication. The platform facilitates project funding, contribution management, certificate generation, and team collaboration through an intuitive interface.

# Features
- User Authentication & Authorization - Secure login/register with JWT
- Project Management - Create, update, and manage projects
- Contribution System - Track and manage project contributions
- Payment Processing - Handle contributions and payouts
- Certificate Generation - Auto-generate contribution certificates
- Real-time Chat - Socket.io powered instant messaging
- Notifications - Real-time notification system
- User Dashboard - Comprehensive analytics and stats
- Admin Panel - Full administrative control
- Payment Tracking - Monitor pending and completed payments

# Tech Stack
# Frontend
- React 18	UI library for building user interfaces
- Vite	Build tool and development server
- TailwindCSS	Utility-first CSS framework for styling
- Framer Motion	Animation library for smooth UI transitions
- React Router v6	Client-side routing and navigation
- Axios	HTTP client for API requests
- Socket.io Client	Real-time bidirectional communication
- React Hook Form	Form handling and validation
- React Query	Data fetching and state management
- Recharts	Data visualization and charts
- React Hot Toast	Toast notifications
- Lucide React	Icon library

# Backend
- Node.js	JavaScript runtime environment
- Express.js	Web application framework
- MongoDB	NoSQL database for flexible data storage
- Mongoose	ODM for MongoDB schema modeling
- Socket.io	Real-time WebSocket communication
- JWT (JSON Web Tokens)	Authentication and authorization
- Bcrypt.js	Password hashing for security
- Dotenv	Environment variable management
- Nodemailer	Email sending service
- CORS	Cross-Origin Resource Sharing configuration
- Express Validator	Input validation middleware
- Winston	Logging and debugging

# DevOps & Deployment
- Docker	Containerization for consistent environments
- Docker Compose	Multi-container orchestration
- GitHub Actions	CI/CD pipeline automation
- Docker Hub	Container registry
- Render	Cloud application hosting (with Docker support)

# Required Software
Check if you have these installed
- node --version     
- npm --version     
- git --version      
- mongodb --version   (optional - we'll use MongoDB Atlas)
- docker --version    (optional - for Docker setup)
- docker-compose --version  (optional)

# Quick Start
1. Clone the repository
git clone 
2. Setup Backend
cd backend
npm install
cp .env.example .env
Edit .env with your MongoDB URI and JWT Secret
3 Setup Frontend
cd ../frontend
npm install
cp .env.example .env
Edit .env with your API URL
4. Run the application
cd ..
npm run dev
or run separately:
- Terminal 1: cd backend && npm run dev
- Terminal 2: cd frontend && npm run dev

# Docker Setup (Containerized)
- Build and run with Docker Compose
- docker-compose up -d --build
- Access the application
......................


Link - https://digital-partner-web.onrender.com/
