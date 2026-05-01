const jwt = require("jsonwebtoken");

const AdminAuth = (req, res, next) => {
    const token = "123";
    if (token === "123") {
        next();
    } else {
        res.status(401).send("Unauthorized");
    }
}


const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.send("Please login");
    }

    const decoded = jwt.verify(token, "secretKey");

    req.user = decoded; // attach user data

    next(); // move to next
  } catch (err) {
    res.send("Invalid token");
  }
};

module.exports = { AdminAuth , authMiddleware };