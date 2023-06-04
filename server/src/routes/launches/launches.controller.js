const {
  getAllLaunches,
  scheduleNewLaunch,
  existsLaunchWithId,
  abortLaunchById,
} = require("../../models/launches.model");

const { getPagination } = require('../../services/query');

async function httpGetAllLaunches(req, res) {
  const { skip, limit } = getPagination(req.query);
  const launches = await getAllLaunches(skip, limit);
  return res.status(200).json(launches);
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;

  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }

  // customize launchDate to save properly
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  await scheduleNewLaunch(launch);
  // explicit return to only ever set response ONCE
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  // need to get id from query params
  const launchId = Number(req.params.id);
  // if launch not exist return 404
  const existsLaunch = await existsLaunchWithId(launchId);
  if (!existsLaunch) {
    return res.status(404).json({
      error: "Launch not found",
    });
  }
  // if launch does exist
  const aborted = await abortLaunchById(launchId);

  if (!aborted) {
    // here it's possible that a launch could have already been aborted, which would return false
    return res.status(400).json("Launch not aborted");
  }

  return res.status(200).json({
    ok: true
  });
}

module.exports = {
  httpGetAllLaunches,
  httpAddNewLaunch,
  httpAbortLaunch,
};
