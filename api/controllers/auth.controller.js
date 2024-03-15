const bcryptjs = require("bcryptjs");
const { User } = require("../models/user");
const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPass = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPass,
  });
  await newUser.save();
  const jwtToken = newUser.genJwtToken();
  res
    .status(200)
    .cookie("access_token", jwtToken, {
      httpOnly: true,
    })
    .json("User has been created");
};

const signin = async (req, res) => {
  const { username, password } = req.body;
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
    res.status(200).cookie("access_token", jwtToken, {
        httpOnly: true
    }).json("User authenticated");
  } catch (error) {
    console.log(error.message)
  }
};

module.exports = {
  signup,
  signin
};
