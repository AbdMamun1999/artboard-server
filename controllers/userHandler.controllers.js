const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.createUsers = async (req, res, next) => {
  try {
    const hashedPassord = await bcrypt.hash(req.body.password, 10);
    const newUser = {
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
      password: hashedPassord,
    };

    const user = await User.create(newUser);

    await user.save();

    res.status(200).json({
      status: true,
      message: "Signup successful!",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "signup failed",
      error: error.message,
    });
  }
};

module.exports.loginUsers = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (user[0].email === req.body.email) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        // genarate token
        const token = await jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.ACCESS_TOKEN_SECRETE,
          {
            expiresIn: "1h",
          }
        );

        console.log(token.red.bold);

        res.status(200).json({
          access_token: token,
          message: "login successful",
        });
      } else {
        res.status(401).json({
          error: "Authetications failed!",
        });
      }
    } else {
      res.status(401).json({
        error: "Autheticationed failed!",
      });
    }
  } catch (error) {
    res.status(401).json({
      error: "Autheticationeed failed!",
      error: error.message,
    });
  }
};
