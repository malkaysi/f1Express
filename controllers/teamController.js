const Team = require("../models/team.js");

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

// Display detail list of Team
exports.team_detail = (req, res) => {
  res.send(`Not Implemented: Team detail: ${req.params.id}`);
}

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