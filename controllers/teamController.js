const Team = require("../models/team.js");
const Car = require("../models/car");

const async = require("async");

// Display list of all Teams.
exports.team_list = function (req, res, next) {
  Team.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_teams) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("team_list", {
        title: "Team List",
        team_list: list_teams,
      });
    });
};

// Display detail page for a Team.
exports.team_detail = (req, res, next) => {
  async.parallel(
    {
      team(callback) {
        Team.findById(req.params.id).exec(callback);
      },

      team_cars(callback) {
        Car.find({ team: req.params.id }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results.team == null) {
        // No results.
        const err = new Error("Team not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render
      res.render("team_detail", {
        title: "Team Detail",
        team: results.team,
        team_cars: results.team_cars,
      });
    }
  );
};


// Display Team create form on GET.
exports.team_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Team create GET");
};

// Handle Team create on POST.
exports.team_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Team create POST");
};

// Display Team delete form on GET.
exports.team_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Team delete GET");
};

// Handle Team delete on POST.
exports.team_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Team delete POST");
};

// Display Team update form on GET.
exports.team_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Team update GET");
};

// Handle Team update on POST.
exports.team_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Team update POST");
};