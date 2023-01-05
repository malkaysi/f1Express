const Car = require("../models/car.js");
const Team = require("../models/team.js");

const async = require("async");
const { body, validationResult } = require("express-validator");

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
  Car.findById(req.params.id)
    .populate('team')
    .exec(function (err, car) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("car_detail", { title: "Car Detail", car })
    })
}

// Display Car create form on GET.
exports.car_create_get = (req, res) => {
  Team.find({})
    .exec(function (err, teams) {
      if (err) {
        return next(err);
      }
      // Successful, so render
      res.render("car_form", { title: "Register Car", teams })
    })
};

// Handle Car create on POST.
exports.car_create_post = [
  // Validate and santize
  body("make")
    .trim()
    .isLength({ min: 1, max: 20 })
    .escape()
    .withMessage("Car make must be specified")
    .isAlphanumeric()
    .withMessage("Car make has non-alphanumeric characters."),
  body("description")
    .trim()
    .isLength({ min: 1, max: 300 })
    .escape()
    .withMessage("Car description must be entered"),
  body("team", "Car must be registered under a team")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("price", "Cost must not be empty")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage("Price must be numeric")
    .escape(),
  body("number_in_stock", "Stock must not be empty")
    .trim()
    .isLength({ min: 1 })
    .isNumeric()
    .withMessage("Stock must be numeric")
    .escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {
    // Extract validation errors
    const errors = validationResult(req)
    // Data from form is valid.

    const car = new Car({
      make: req.body.make,
      description: req.body.description,
      team: req.body.team,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    })

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all cars and teams for form.

      async.parallel(
        {
          teams(callback) {
            Team.find(callback)
          },
        },
        (err, results) => {
          if (err) {
            return next(err);
          }

          res.render("car_form", {
            teams: results.teams,
            car,
            errors: errors.array(),
          });
        }
      )
      return;
    }

    // Date form is valid
    car.save((err) => {
      if (err) {
        return next(err);
      }
      // Success, redirect to new car
      res.redirect(car.url);
    })
  }
]

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