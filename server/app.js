/**
 *  Modules dependencies
 */
const express = require('express');
const chalk = require('chalk');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');

/**
 *  Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.config();


/**
 *  Create Express Server
 */
const app = express();

/**
 * Express configuration.
 */
module.exports = require('./config/express')(app);

/**
 * Firebase configuration & init
 */
module.exports = require('./config/firebase')();

/**
 * App routes.
 */
module.exports = require('./src/routes')(app);

/**
 * Error 404
 */
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err)
});
/**
 * Error handler
 */
app.use((err, req, res, next) => {

    let data = {
        message: err.message,
        status: err.status || 500
    };

    if(app.get('env') === 'development') {
       data.stack = err.stack;
    }

    res.status(data.status);
    res.format({
        json: () => { res.send(data) }
    });
});

/**
 * Connect to the Database & start Express server.
 */
const options = require('./config/mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI_PROD || process.env.MONGODB_URI_DEV, options)
        .then(() => {
            console.log('%s Connection has been established successfully with the database', chalk.green('✓'));
            /**
             * Running server
             */
            app.listen(app.get('port'), () => {
                console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'));
                console.log('-- Press CTRL-C to stop --\n');
        });
})    
.catch(err => {
    console.error(Object.assign({},err, {
        message: `${err.message}\n
        ${chalk.red('✗')} MongoDB connection error. Please make sure MongoDB is running.`
    }));
});

module.exports = app;