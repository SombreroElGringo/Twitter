const admin = require('firebase-admin');
const chalk = require('chalk');
let serviceAccount = require('./serviceAccountKey.json');
/*
serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT,
    privateKey: process.env.FIREBASE_API_KEY
};*/

module.exports = function() {
    // Initialize Firebase
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: process.env.FIREBASE_DB_URI
    });

    console.log('%s Connection has been established successfully with the database Firebase 🔥', chalk.green('✓')); 
};