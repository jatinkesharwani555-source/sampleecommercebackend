const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.tokenName;

  console.log("Cookies Received: ", req.cookies);
  if (!token) {
    console.log("!token not verified")
    return res.status(401).json({
      success: false,
      message: "Not Verified"
    });
  }
  console.log("token", token)

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid Token"
    });
  }
}
module.exports = verifyToken;