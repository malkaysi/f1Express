const Team = require("../models/team.js");
const Car = require("../models/car");

const async = require("async");
const { body, validationResult } = require("express-validator");

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
  res.render("team_form", { title: "Create a Team" })
};

// Handle Team create on POST.
exports.team_create_post = [
  // Validate and sanitize fields
  body("name")
    .trim()
    .isLength({ min: 1, max: 20 })
    .escape()
    .withMessage("Team name must be specified")
    .isAlphanumeric()
    .withMessage("Team name has non-alphanumeric characters."),
  body("description")
    .trim()
    .isLength({ min: 1, max: 300 })
    .escape()
    .withMessage("Team description must be entered"),
    

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract validation errors
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/errors messages.
      res.render("team_form", {
        title: "Create Team",
        team: req.body,
        errors: errors.array(),
      });
      return;
    }
    // Data from form is valid.

    // Create a team object 
    const team = new Team({
      name: req.body.name,
      description: req.body.description
    });

    team.save((err) => {
      if(err) {
        return next(err)
      }

      // Successful, redirect new team url
      res.redirect(team.url)
    })
  },
];

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