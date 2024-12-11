const mongoose = require('mongoose');
const Trip = require('../models/travlr'); // Register model
const Model = mongoose.model('trips');
const User = mongoose.model('users');

const getUser = async (req, res, callback) => {
    console.log('in #getUser');
    
    if (req.auth && req.auth.email) {
        try {
            const user = await User
                .findOne({ email: req.auth.email })
                .exec();

            if (!user) {
                return res
                    .status(404)
                    .json({"message": "Email not found"});
            }

            callback(req, res, user);

        } catch (err) {
            console.log(err);
            return res
                .status(404)
                .json(err);
        }
    } else {
        return res
            .status(404)
            .json({"message": "User not found"});
    }
};

// GET: /trips - list all the trips
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client.
const tripsList = async (req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following line to show results of querey
        // on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
    }

};

// GET: /trips/:tripCode - lists a single trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client.
const tripsFindByCode = async (req, res) => {
    const q = await Model
        .find({'code' : req.params.tripCode}) // Return single record
        .exec();

        // Uncomment the following line to show results of querey
        // on the console
        // console.log(q);

    if(!q)
    { // Database returned no data
        return res
                .status(404)
                .json(err);
    } else { // Return resulting trip list
        return res
                .status(200)
                .json(q);
    }

};

// POST: /trips - adds a new Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client.
const tripsAddTrip = async (req, res) => {
    getUser(req, res, async (req, res, user) => {
        const newTrip = new Trip({
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        });

        try {
            const q = await newTrip.save();
            if (!q) {
                return res
                    .status(400)
                    .json(err);
            } else {
                return res
                    .status(201)
                    .json(q);
            }
        } catch (err) {
            return res
                .status(400)
                .json(err);
        }
    });
};

// PUT: /trips/:tripCode - Updates a Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
    getUser(req, res, async (req, res, user) => {
        // Uncomment for debugging
        // console.log(req.params);
        // console.log(req.body);

        try {
            const q = await Model.findOneAndUpdate(
                { code: req.params.tripCode },
                {
                    code: req.body.code,
                    name: req.body.name,
                    length: req.body.length,
                    start: req.body.start,
                    resort: req.body.resort,
                    perPerson: req.body.perPerson,
                    image: req.body.image,
                    description: req.body.description,
                },
                { new: true } // Return the updated document
            ).exec();

            if (!q) {
                // Database returned no data
                return res.status(400).json({ message: "Trip not found or update failed" });
            }

            // Return resulting updated trip
            return res.status(200).json(q);

        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: "Server error" });
        }
    });
};

module.exports = { 
    tripsList,
    tripsFindByCode,
    tripsAddTrip,
    tripsUpdateTrip,
    getUser 
};