const jwt = require("jsonwebtoken");
require("dotenv").config();

const isAuthenticated = async (req, res, next) => {
  try {
    const token = await req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: "false",
      });
    }
    const decode = jwt.verify(token, process.env.SECRET_TOKEN);
    if (!decode) {
      return res.status(401).json({
        message: "Invalid token!",
        success: true,
      });
    }
    req.id = decode.id;
  } catch (error) {
    console.log("**Error during Authorization**", error);
  }
}

export default isAuthenticated
