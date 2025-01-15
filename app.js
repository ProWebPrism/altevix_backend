const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const dbConnect = require('./config/db')
const sectionRoutes = require('./routes/HomeSectionRoutes')
const aboutRoutes = require('./routes/aboutSectionRoutes')
const path = require('path')


const app = express()
dotenv.config()
dbConnect()
app.use(express.json())
app.use(cors())
app.use('/api/section', sectionRoutes)
app.use('/api/about', aboutRoutes)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const PORT = 5000
app.listen(5000, () => console.log(`Server running on port ${PORT} `))