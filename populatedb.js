#! /usr/bin/env node

console.log('This script populates some test cars and teams for formula 1 to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require('async')
var Car = require('./models/car')
var Team = require('./models/team')

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var cars = []
var teams = []

function teamCreate(name, description, cb) {
  teamDetail = {
    name: name,
    description: description
  }

  var team = new Team(teamDetail);

  team.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Team: ' + team);
    teams.push(team)
    cb(null, team)
  })
}

function carCreate(make, description, team, price, number_in_stock, cb) {
  carDetail = {
    make: make,
    description: description,
    team: team,
    price: price,
    number_in_stock: number_in_stock,
  }
  if (team != false) carDetail.team = team

  var car = new Car(carDetail);
  car.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Car: ' + car);
    cars.push(car)
    cb(null, car)
  });
}

function createTeams(cb) {
  async.series([
    function (callback) {
      teamCreate('Ferrari', 'The team that always loses', callback);
    },
    function (callback) {
      teamCreate('Red Bull', 'Won 2 straight WDC and the WCC', callback);
    },
  ],
    // optional callback
    cb);
}

function createCars(cb) {
  async.parallel([
    function (callback) {
      carCreate("F1-75", "Designed and constructed by Scuderia Ferrari which competed in the 2022 Formula One World Championship", teams[0], 1200000, 6, callback)
    },
    function (callback) {
      carCreate("SF21", "Designed and constructed by Scuderia Ferrari to compete in the 2021 Formula One World Championship", teams[0], 1100000, 4, callback)
    },
    function (callback) {
      carCreate("RB18", "Designed and constructed by Red Bull Racing which competed in the 2022 Formula One World Championship.", teams[1], 2400000, 5, callback)
    },
    function (callback) {
      carCreate("RB16B", "Designed and constructed by Red Bull Racing to compete during the 2020 and 2021 Formula One World Championships", teams[1], 2100000, 8, callback)
    },
  ],
    // optional callback
    cb);
}

async.series([
  createTeams,
  createCars,
],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log('FINAL ERR: ' + err);
    }
    else {
      console.log('teams: ' + teams);

    }
    // All done, disconnect from database
    mongoose.connection.close();
  });



