const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//signup user
module.exports.userSignUp = async (req, res) => {
  let { name, email: emailRaw, password, phone, img } = req.body;
  let email = emailRaw.toLowerCase();
  try {
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const userRegistered = await userModel.findOne({ email: email });
    if (userRegistered) {
      return res.status(400).json({
        message: "User already registered",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    let registeredUser = await userModel.create({
      name,
      email,
      phoneNo: phone,
      password: hashedPassword,
      img,
    });
    const token = jwt.sign({ id: registeredUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });
    res.cookie("TOKEN", token, {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      sameSite: "strict",
    });
    registeredUser.password = "__HIDDEN__";
    return res.status(200).json({
      message: "user registered successfully",
      user: registeredUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//sign in user
module.exports.userSignIn = async function userSignIn(req, res) {
  let { email: emailRaw, password } = req.body;
  let email = emailRaw.toLowerCase();
  console.log(email);
  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill all the fields",
      });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Please register to login !",
      });
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });
      res.cookie("TOKEN", token, {
        expires: new Date(
          Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
      });
      user.password = "__HIDDEN__";
      return res.status(200).json({
        message: "User logged in successfully",
        user,
      });
    } else {
      return res.status(400).json({
        message: "wrong credentials",
      });
    }
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//logout user
module.exports.userLogout = async function userLogout(req, res) {
  try {
    res.clearCookie("TOKEN");
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

//is authenticated or not
module.exports.isAuthenticated = async function isAuthenticated(req, res) {
  try {
    const { TOKEN } = req.cookies;
    if (!TOKEN) {
      return res.status(401).json({
        message: "Please login ",
      });
    }
    const { id } = jwt.verify(TOKEN, process.env.JWT_SECRET);
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    } else {
      return res.status(201).json({
        message: "registered user",
        user,
      });
    }
  } catch (err) {
    return res.status(400).json({
      message: "Please login to continue",
    });
  }
};

//logout user
module.exports.userLogout = async function userLogout(req, res) {
  try {
    res.clearCookie("TOKEN");
    return res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
