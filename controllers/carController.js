const Car = require("../models/car");

exports.index = (req, res) => {
  res.send("NOT IMPLEMENTED: Site Home Page");
};

// Display list of Cars
exports.car_list = (req, res) => {
  res.send("Not Implemented: Car List");
}

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