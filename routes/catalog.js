const express = require("express");
const router = express.Router();

const car_controller = require("../controllers/carController");
const team_controller = require("../controllers/teamController");

// Car Routes //

// GET catalog home page.
router.get("/", car_controller.index);

// GET request for creating a Car. NOTE This must come before routes that display Car (uses id).
router.get("/car/create", car_controller.car_create_get);

// POST request for creating car.
router.post("/car/create", car_controller.car_create_post);

// GET request to delete car.
router.get("/car/:id/delete", car_controller.car_delete_get);

// POST request to delete car.
router.post("/car/:id/delete", car_controller.car_delete_post);

// GET request to update car.
router.get("/car/:id/update", car_controller.car_update_get);

// POST request to update car.
router.post("/car/:id/update", car_controller.car_update_post);

// GET request for one car.
router.get("/car/:id", car_controller.car_detail);

// GET request for list of all car items.
router.get("/cars", car_controller.car_list);

/// Team ROUTES ///

// GET request for creating Team. NOTE This must come before route for id (i.e. display team).
router.get("/team/create", team_controller.team_create_get);

// POST request for creating team.
router.post("/team/create", team_controller.team_create_post);

// GET request to delete team.
router.get("/team/:id/delete", team_controller.team_delete_get);

// POST request to delete team.
router.post("/team/:id/delete", team_controller.team_delete_post);

// GET request to update team.
router.get("/team/:id/update", team_controller.team_update_get);

// POST request to update team.
router.post("/team/:id/update", team_controller.team_update_post);

// GET request for one team.
router.get("/team/:id", team_controller.team_detail);

// GET request for list of all teams.
router.get("/teams", team_controller.team_list);

module.exports = router;
