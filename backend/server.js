const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const colors = require("colors");
const connectDB = require("./db/connection.js");
const dotenv = require("dotenv");
dotenv.config();
connectDB();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Define your routes
const visitorRoutes = require('./routes/visitorRoutes');
const contractorRoutes = require('./routes/contractorRoutes');
const auth = require('./routes/auth');

app.use('/api/visitor', visitorRoutes); 
app.use('/api/contractor',contractorRoutes);
app.use('/api/auth', auth);
app.use(cors({
  origin: '*', // Change this to your frontend's origin if needed for better security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`.yellow.bold);
});
