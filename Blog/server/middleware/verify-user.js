const jwt = require("jsonwebtoken");
const SECRET = "jwttoken";

const verifyUser = async (req, res, next) => {
  const tokenHeader = req.headers.authorization;

  if (!tokenHeader) {
    return res.status(400).json({ message: "token not found" });
  }
  const token = tokenHeader.split(" ")[1];
 
  jwt.verify(token, SECRET, function (err, decoded) {
    if (err) {
      console.log("got error", err);
    }
  });

  next();
};

module.exports = verifyUser;
