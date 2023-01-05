const Car = require("../models/car.js");
const Team = require("../models/team.js");

const async = require("async");

exports.index = (req, res) => {
  async.parallel(
    {
      car_count(callback) {
        Car.countDocuments({}, callback); // Pass an empty object as match condition to find all documents of this collection
      },
      team_count(callback) {
        Team.countDocuments({}, callback);
      },
    },
    (err, results) => {
      res.render("index", {
        title: "Formula 1 Home",
        error: err,
        data: results,
      });
    }
  );
};

// Display list of Cars
exports.car_list = function (req, res, next) {
  Car.find({}, "make team")
    .sort({ title: 1 })
    .populate("team")
    .exec(function (err, list_cars) {
      if (err) {
        return next(err);
      }
      //Successful, so render
      res.render("car_list", { title: "Car List", list_cars: list_cars });
    });
};

// Display detail list of Car
exports.car_detail = (req, res) => {
  res.send(`Not Implemented: Car detail: ${req.params.id}`);
}

// Display Car create form on GET.
exports.car_create_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Car create GET");
};

// Handle Car create on POST.
exports.car_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Car create POST");
};

// Display Car delete form on GET.
exports.car_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Car delete GET");
};

// Handle Car delete on POST.
exports.car_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Car delete POST");
};

// Display Car update form on GET.
exports.car_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Car update GET");
};

// Handle Car update on POST.
exports.car_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Car update POST");
};