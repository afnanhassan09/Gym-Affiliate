require('dotenv').config();
const express = require('express');
const connectDB = require('./config/dbConnection.js')
const recRoutes = require("./routes/recruiterRoutes.js");
const afflRoutes = require("./routes/affiliateRoutes.js");
const app = express();

connectDB(process.env.DATABASE_STRING)

app.use(express.json());

app.use('/recruiter', recRoutes);
app.use('/affiliate', afflRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${process.env.BACKEND_URL}`);
})
