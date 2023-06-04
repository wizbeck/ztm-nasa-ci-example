const { getAllPlanets } = require('../../models/planets.model');

async function httpGetAllPlanets(req, res) {
  // status defaults to 200 but setting explicitly will remind us
  // need to specify return in case multiple status sets occur across controller action return a response
  return res.status(200).json(await getAllPlanets());
}

module.exports = {
  httpGetAllPlanets,
}