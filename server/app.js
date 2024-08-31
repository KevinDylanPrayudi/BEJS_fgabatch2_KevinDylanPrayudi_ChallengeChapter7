require("./lib/instrument.js");

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const Sentry = require("@sentry/node");

const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');

const errorHandler = require('./middlewares/error-handler.middleware');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
}


app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/auth', authRouter);

app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
});

// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(res.sentry + "\n");
});

app.use(errorHandler);

module.exports = app;
