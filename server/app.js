const express = require('express');
const app = express();
const connectDB = require('./config/db');
const admin = require('firebase-admin');
// const serviceAccount = require('./firebase-admin-key.json');


const authroute = require('./routes/auth');
const journalroute = require('./routes/journal');
const testroute = require('./routes/test');

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
//   });
  
//   const firestore = admin.firestore();
connectDB();

app.use(express.json());

app.use('/api/auth', authroute);
app.use('/api/journal', journalroute);
app.use('/api/test', testroute);

module.exports = app;