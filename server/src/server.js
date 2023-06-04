const http = require("http");

// populates environment with our config variables from .env
require('dotenv').config();

const app = require("./app");
const { mongoConnect } = require("./services/mongo");
const { loadPlanetsData } = require("./models/planets.model");
const { loadLaunchData } = require('./models/launches.model');

// It's better to set up this server this way for adding middleware to the app listener object, and or set up for creating websockets
const server = http.createServer(app); // use this to create a server with a server object, like the express app
const PORT = process.env.PORT || 8000; // PORT can be set in scripts or .env file

async function startServer() {
  await mongoConnect(); // can pass options object here (see mongoose documentation)
  await loadPlanetsData(); // preload planets data
  await loadLaunchData(); // preload launch data

  server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}

startServer();
