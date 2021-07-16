const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './config/config.env' });

connectDB();

const clinic = require('./routes/clinic');
const vet = require('./routes/vet');
const user = require('./routes/user');
const auth = require('./routes/auth');
const review = require('./routes/review');
const pet = require('./routes/pet');

const app = express();

// Cookie parser
app.use(cookieParser());

app.use(express.json());

app.use('/clinic', clinic);
app.use('/vet', vet);
app.use('/user', user);
app.use('/auth', auth);
app.use('/review', review);
app.use('/pet', pet);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));
