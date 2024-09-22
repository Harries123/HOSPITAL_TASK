const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');
const hospitalRoutes = require('./routes/hospitalRoutes'); // Add this line

const app = express();
app.use(morgan('dev'));
app.use(express.json());

app.use('/hospitals', hospitalRoutes); // Move this line down here

const dataPath = path.join(__dirname, 'hospital.json');

// You can remove the duplicate CRUD routes since they are now handled in hospitalRoutes.js

app.listen(3000, () => {
    console.log('Server is running on PORT 3000');
});
