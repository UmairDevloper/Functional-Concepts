const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
  const headersObj = req.headers;

  const token = headersObj?.authorization?.split(" ")[1];

  const verifyToken = jwt.verify(token, "token", (err, decoded) => {
    if (err) {
      return res.status(401).json({
        message: "Failed to verify token...",
      });
    } else {
      return decoded;
    }
  });

  if (verifyToken) {
    req.user = verifyToken.id;
    next();
  } else {
    const err = new Error("Invalid Token");
    next(err);
  }
};

module.exports = isAuthorized;
