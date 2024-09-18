const { user } = require("../db/Models/model");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECRET = "jwttoken";
const saltRounds = 10;

//register
const registerUser = async (req, res) => {
  try {
    const { username, email, password} = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "fields are required" });
    }
    const isvalid = validator.validate(email);
    if (!isvalid) {
      return res.status(400).json({ message: "Email is not valid" });
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);

    const addUser = await user.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: "user",
    });

    if (addUser) {
      const userId = await addUser.dataValues.id;

      const token = jwt.sign({ userId }, SECRET);
      console.log(token);
      return res
        .cookie("Auth", token)
        .status(200)
        .json({ succes: "true", message: "user created successfuly", token });
    } else {
      return res.status(401).json({ message: "error while creating" });
    }
  } catch (error) {
    return res.status(500).json({ message: "server error", error });
  }
};
//admin route
const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email || !password) {
    return res.status(401).json({ message: "field requires" });
  }

  const userExist = await user.findOne({ where: { email: email } });
  if (!userExist) {
    return res.status(401).json({ message: "invalid user" });
  }
  if (userExist.role == "admin") {
    const dbPassword = await userExist.dataValues.password;
    const hashedPassword = await bcrypt.compare(password, dbPassword);
    if (!hashedPassword) {
      return res.status(400).json({ message: "invalid user or password" });
    }
    const userId = userExist.id;
    const token = jwt.sign({ userId }, SECRET);
    return res
      .cookie("Auth", token)
      .status(200)
      .json({ message: "login succesfully", token, userExist });
  } else {
    return res.status(400).json({message: "soory user is not valid"})
  }
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);

  if (!email || !password) {
    return res.status(401).json({ message: "field requires" });
  }

  const userExist = await user.findOne({ where: { email: email } });
  console.log(userExist);
  if (!userExist) {
    return res.status(401).json({ message: "invalid user" });
  }

  const dbPassword = await userExist.dataValues.password;
  console.log(dbPassword);
  const hashedPassword = await bcrypt.compare(password, dbPassword);

  if (!hashedPassword) {
    return res.status(400).json({ message: "invalid user or password" });
  }
  const userId = userExist.id;
  const token = jwt.sign({ userId }, SECRET);
  return res
    .cookie("Auth", token)
    .status(200)
    .json({ message: "login succesfully", token, userExist });
};

//logout
const logoutUser = (req, res) => {
  return res
    .clearCookie("Auth")
    .status(200)
    .json({ message: "user successfully logout" });
};

module.exports = { registerUser, loginUser, logoutUser, adminLogin };
