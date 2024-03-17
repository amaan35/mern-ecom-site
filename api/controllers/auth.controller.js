const bcryptjs = require("bcryptjs");
const { User } = require("../models/user");
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    res.status(400).json("All fields are required");
  }
  const hashedPass = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPass,
  });
  try {
    const user = await newUser.save();
    const jwtToken = user.genJwtToken();
    const { password: pass, ...rest } = user._doc;
    res
      .status(200)
      .cookie("access_token", jwtToken, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const signin = async (req, res) => {
  const { username, password } = req.body;
  if (
    !username ||
    !password ||
    username === "" ||
    password === ""
  ) {
    res.status(400).json("All fields are required");
  }
  try {
    const validUser = await User.findOne({ username });
    if (!validUser) {
      return res.status(404).json("User not found");
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return res.status(401).json("Bad Credentials");
    }
    const jwtToken = validUser.genJwtToken();
    const {password: pass, ...rest} = validUser._doc;
    res
      .status(200)
      .cookie("access_token", jwtToken, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    res.status(400).json(error.message)
  }
};

module.exports = {
  signup,
  signin,
};
