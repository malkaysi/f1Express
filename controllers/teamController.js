const Team = require("../models/team");

// Display list of Teams
exports.team_list = (req, res) => {
  res.send("Not Implemented: Team List");
}

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