const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

//import routes
const userRoutes = require('./routes/userRouter');
const productRoutes = require('./routes/produtRoutes');

dotenv.config(); // Load environment variables

const app = express();
const port = process.env.PORT || 5000;

// Middleware to parse incoming JSON data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));// Serve static files from the 'public' directory

// Enable CORS
app.use(cors({ origin: '*' })); // Allow all origins for simplicity; adjust as needed

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        // Start the server
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

// Routes
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);

