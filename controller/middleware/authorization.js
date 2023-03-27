const jwt = require("jsonwebtoken");

const authorization = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({
        message: "No Token provided",
      });
    }
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "sktiman", function (err, decoded) {
      if (err) {
        return res.status(400).json({
          message: "wrong Token ",
        });
      }
      console.log(decoded);
      req.body.userID = decoded.userID;
      req.userID = decoded.userID;

      next();
      // res.send("hii");
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = { authorization };
