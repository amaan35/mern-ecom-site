const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
  const cookie_header = req.get("cookie");
  const jwtToken = cookie_header.split("=")[1];
  if (!jwtToken) {
    return res.status(401).json("Token does not exist");
  }
  jwt.verify(jwtToken, process.env.SECRET_KEY, (error, decoded) => {
    if (error) {
      return res.status(401).json("Unauthorized");
    }
    req.decodedUser = decoded;
    next();
  });
};

module.exports = {
  verifyAdmin,
};
