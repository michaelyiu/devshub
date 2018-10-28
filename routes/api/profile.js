const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

//Load Profile and User Model
const Profile = require('./../../models/Profile');
const User = require('./../../models/User');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public route
router.get('/test', (req, res) => res.json({ msg: "Profile Works " }));

// @route   GET api/profile
// @desc    Get current users profile
// @access  Private route
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const errors = {};
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      if (!profile) {
        errors.noProfile = 'There is no profile for this user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
});


module.exports = router;