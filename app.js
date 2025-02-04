const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const dbConnect = require('./config/db')
const sectionRoutes = require('./routes/HomeSectionRoutes')
const aboutRoutes = require('./routes/aboutSectionRoutes')
const productPageRoutes = require('./routes/productPageRoutes')
const contactPageRoute = require('./routes/contactPageRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const contactRoutes = require('./routes/contactRoute')
const productRoutes = require('./routes/productRoutes')
const googleRoutes = require('./routes/googleRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const cartRoutes = require('./routes/cartRoutes')
const path = require('path')
const session = require("express-session");


const app = express()
dotenv.config()
dbConnect()
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow cookies (sessions) to be sent
  }));
  app.use(
    session({
      secret: "your-secret-key", // Secret key to encrypt session
      resave: false, // Don't resave session if not modified
      saveUninitialized: true, // Save a session even if it's uninitialized
      cookie: {
        secure: false, // Set to true if using HTTPS
        httpOnly: true, // Helps prevent XSS attacks
        maxAge: 3600000, // Session expiration time (1 hour)
      },
    })
  );
  app.use(cookieParser());
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/section', sectionRoutes)
app.use('/api/about', aboutRoutes)
app.use('/api/product-page', productPageRoutes)
app.use('/api/contact-page', contactPageRoute)
app.use('/api/contact', contactRoutes)
app.use('/api/product', productRoutes)
app.use('/api/google', googleRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/cart', cartRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = 5000
app.listen(5000, () => console.log(`Server running on port ${PORT} `))