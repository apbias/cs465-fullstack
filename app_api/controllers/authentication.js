const passport = require('passport');
const mongoose = require('mongoose');
const User = mongoose.model('users');

const register = async (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ "message": "All fields required" });
  }

  const user = new User();
  user.name = req.body.name;
  user.email = req.body.email;
  user.setPassword(req.body.password);

  try {
    await user.save();
    const token = user.generateJwt();
    res
      .status(200)
      .json({ token });
  } catch (err) {
    res
      .status(400)
      .json(err);
  }
};

const login = (req, res) => {
  console.log('Login attempt with:', { 
    email: req.body.email,
    hasPassword: !!req.body.password 
  });

  if (!req.body.email || !req.body.password) {
    console.log('Missing credentials');
    return res
      .status(400)
      .json({ "message": "All fields required" });
  }

  passport.authenticate('local', (err, user, info) => {
    console.log('Passport authenticate result:', { 
      hasError: !!err, 
      hasUser: !!user,
      info 
    });

    if (err) {
      console.log('Authentication error:', err);
      return res
        .status(404)
        .json(err);
    }

    if (user) {
      console.log('User authenticated successfully');
      const token = user.generateJwt();
      res
        .status(200)
        .json({ token });
    } else {
      console.log('Authentication failed:', info);
      res
        .status(401)
        .json(info);
    }
  })(req, res);
};

module.exports = {
  register,
  login
};