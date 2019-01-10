// These are important and needed before anything else
const express = require('express');
const fs = require('fs');
const logger = require('./logger');

const app = express();
const morgan = require('morgan');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const api = require('./api');

const DIST_FOLDER = path.join(process.cwd() , 'dist');
logger.debug(DIST_FOLDER);

function start(properties, db) {
    app.set('view engine', 'html');
    app.use(express.static(path.join(DIST_FOLDER, "public")));
    app.set('views', path.join(DIST_FOLDER, "views"));

    app.use(function (req, res, next) {
        req.db = db;
        req.properties = properties;
        next();
    });

    // Parsers for POST data
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.enable('trust proxy');

    // Point static path to dist
    app.use(express.static(path.join(__dirname, 'dist')));
    app.use('/api', api);
    // use morgan to log api calls
    morgan.token('xff', function (req, res) { 
        return req.headers['X-Forwarded-For'];
    });
    app.use(morgan(':remote-addr :remote-user :method :url HTTP/:http-version :status :res[content-length] - :response-time ms :xff', { 'stream': logger.stream }));


    // error handler
    app.use(function (err, req, res, next) {
        logger.error(err.message);
        res.status(500).send({error: err.name + ' | ' + err.message});
    });    
    return app;
}

module.exports = start;
module.exports.app = app;
