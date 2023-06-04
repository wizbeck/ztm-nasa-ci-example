const express = require('express');

const planetsRouter = require("./planets/planets.router");
const launchesRouter = require("./launches/launches.router");

const api = express.Router();

api.use("/planets", planetsRouter); // note: we can specify a base path for middleware handling for routes
api.use("/launches", launchesRouter); // this helps us to write cleaner code, even though the abstraction might not make sense right away


module.exports = api;