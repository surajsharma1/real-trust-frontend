# Real Trust - Lead Generation Landing Page

A full-stack lead generation web application for a real estate and construction company called "Real Trust". The application includes a responsive public landing page for lead generation and a secure admin dashboard for content management.

## Project Overview

**Real Trust** is a comprehensive web application designed to help a real estate and construction company generate leads, showcase their projects, and manage client testimonials. The platform consists of two main parts:

1. **Public Website** - A marketing landing page that attracts potential clients
2. **Admin Dashboard** - A secure backend system for managing content

## Features

### Public Website

- **Responsive Landing Page**: Modern, mobile-friendly design that works on all devices
- **Hero Section**: Eye-catching introduction with service icons and call-to-action buttons
- **Services Section**: Showcase of company services (Property Consultation, Interior Design, Financial Planning, Marketing)
- **Projects Portfolio**: Display of completed projects with images and descriptions
- **Client Testimonials**: Happy client testimonials with photos and designations
- **Contact Form**: Lead capture form for potential clients to submit inquiries
- **Newsletter Subscription**: Email subscription for marketing updates

### Admin Dashboard

- **Secure Login**: JWT-based authentication for admin access
- **Project Management**: Add, view, and manage project portfolio
- **Client Testimonials**: Add and manage client testimonials
- **Contact Submissions**: View and manage contact form submissions
- **Subscriber Management**: View and manage newsletter subscribers

## Tech Stack

### Frontend
- **React 18** - UI library for building the interface
- **Vite** - Build tool for fast development
- **React Router** - Client-side routing
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling
- **Custom CSS** - Styling (no Tailwind dependency)

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Token for authentication
- **Cloudinary** - Image upload and storage

## Project Structure

```
real-trust-frontend/
├── frontend/real trust frontend/          # React frontend application
│   ├── src/
│   │   ├── components/                   # Reusable UI components
│   │   │   ├── AddClient.jsx            # Add client testimonial form
│   │   │   ├── AddProject.jsx           # Add project form
│   │   │   ├── clientselection.jsx      # Client testimonials display
│   │   │   ├── ContactList.jsx          # Contact submissions list
│   │   │   ├── contactform.jsx         # Contact form component
│   │   │   ├── newsletter.jsx           # Newsletter subscription
│   │   │   ├── projectsection.jsx       # Projects display
│   │   │   └── SubscriberList.jsx       # Subscribers list
│   │   ├── pages/                      # Page components
│   │   │   ├── landingpage.jsx         # Main landing page
│   │   │   ├── adminlogin.jsx          # Admin login page
│   │   │   └── admindashboard.jsx      # Admin dashboard
│   │   ├── services/
│   │   │   └── api.js                  # API service configuration
│   │   ├── assets/                     # Static assets
│   │   │   ├── images/                 # Image files
│   │   │   ├── icons/                  # SVG icons
│   │   │   └── shapes/                 # Background shapes
│   │   ├── app.jsx                     # Main app component
│   │   ├── main.jsx                    # Entry point
│   │   ├── index.css                   # Global styles
│   │   ├── admin-dashboard.css         # Dashboard styles
│   │   └── protectedroute.jsx          # Protected route wrapper
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js                   # Vite configuration
│   └── vercel.json                     # Vercel deployment config
│
├── backend/real trust backend/            # Node.js backend application
│   ├── controllers/                     # Route handlers
│   │   ├── admincontroller.js           # Admin authentication
│   │   ├── clientcontroller.js          # Client testimonials CRUD
│   │   ├── client_update_delete.js      # Client update/delete
│   │   ├── contactcontroller.js         # Contact form submissions
│   │   ├── contact_update_delete.js     # Contact update/delete
│   │   ├── projectcontroller.js        # Projects CRUD
│   │   ├── project_update_delete.js     # Project update/delete
│   │   ├── subscribercontroller.js      # Newsletter subscriptions
│   │   └── subscriber_update_delete.js  # Subscriber update/delete
│   ├── models/                          # Mongoose schemas
│   │   ├── admin.js                    # Admin user model
│   │   ├── client.js                    # Client testimonial model
│   │   ├── contact.js                   # Contact form model
│   │   ├── project.js                   # Project model
│   │   └── subscriber.js               # Newsletter subscriber model
│   ├── routes/                          # Express routes
│   │   ├── adminroutes.js               # Admin routes
│   │   ├── clientroutes.js              # Client routes
│   │   ├── contactroutes.js             # Contact routes
│   │   ├── projectroutes.js             # Project routes
│   │   └── subscriberroutes.js          # Subscriber routes
│   ├── middleware/                      # Custom middleware
│   │   ├── authmiddleware.js            # JWT authentication
│   │   └── uploadmiddleware.js         # File upload handling
│   ├── config/                          # Configuration files
│   │   ├── cloudinary.js               # Cloudinary setup
│   │   └── db.js                       # MongoDB connection
│   ├── server.js                        # Express app entry point
│   ├── createadmin.js                   # Script to create admin user
│   ├── seed.js                          # Database seeding script
│   └── package.json
│
└── README.md
```

## API Endpoints

### Projects
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/projects` | Get all projects | No |
| POST | `/api/projects` | Create new project | Yes |

### Clients (Testimonials)
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/clients` | Get all clients | No |
| POST | `/api/clients` | Add new client | Yes |

### Contact
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/contact` | Get all contacts | Yes |
| POST | `/api/contact` | Submit contact form | No |

### Subscribers
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| GET | `/api/subscribe` | Get all subscribers | Yes |
| POST | `/api/subscribe` | Subscribe to newsletter | No |

### Admin
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|----------------|
| POST | `/api/admin/login` | Admin login | No |

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   
```
bash
   git clone <repository-url>
   cd real-trust-frontend
   
```

2. **Set up the Backend**
   
```
bash
   cd backend/real\ trust\ backend
   npm install
   
```

3. **Set up the Frontend**
   
```
bash
   cd frontend/real\ trust\ frontend
   npm install
   
```

### Environment Configuration

Create a `.env` file in the `backend/real trust backend` directory:

```
env
# MongoDB Connection String
mongodb_url=mongodb+srv://<username>:<password>@cluster.mongodb.net/realtrust

# JWT Secret Key (generate a random string)
JWT_SECRET=your-super-secret-jwt-key

# Server Port
PORT=5000

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### Running the Application

1. **Start the Backend Server**
   
```
bash
   cd backend/real\ trust\ backend
   npm run dev
   
```
   The server will start on http://localhost:5000

2. **Start the Frontend Development Server**
   
```
bash
   cd frontend/real\ trust\ frontend
   npm run dev
   
```
   The frontend will be available at http://localhost:5173

### Creating Admin User

Run the create admin script to create an admin account:
```
bash
cd backend/real\ trust\ backend
node createadmin.js
```

Default credentials after running the seed script:
- **Email**: admin@example.com
- **Password**: admin123

## Deployment

### Backend Deployment (Render)

1. Push your code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Connect your GitHub repository
4. Configure:
   - Build Command: (leave empty)
   - Start Command: `node server.js`
5. Add Environment Variables:
   - `mongodb_url`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Generate a random string
   - `PORT`: 5000
   - Cloudinary credentials (if using image uploads)

### Frontend Deployment (Vercel)

1. Import your GitHub repository on [Vercel](https://vercel.com)
2. Configure:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy

## Design Highlights

### Landing Page Features
- **Modern Gradient Sidebar**: Decorative background shapes
- **Service Icons**: Custom SVG icons for each service
- **Project Cards**: Image-heavy project展示 with hover effects
- **Testimonial Cards**: Client photos with quoted testimonials
- **Responsive Design**: Mobile-first approach

### Admin Dashboard Features
- **Sidebar Navigation**: Easy access to all sections
- **Form Validation**: Input validation for all forms
- **Image Upload**: File upload support for projects and clients
- **Data Tables**: Clean tabular display of submissions
- **Loading States**: Visual feedback during API calls
- **Error Handling**: User-friendly error messages

## License

MIT License

## Support

For support and inquiries, please contact the development team.
