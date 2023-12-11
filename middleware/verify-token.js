const jwt = require("jsonwebtoken");
const { User } = require("../models");

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({
      meta: {
        message: "Token is missing",
        code: 403,
        status: "error",
      },
      data: "You are not authorized to access this data.",
    });
  }

  const tokenJWT = token.split(" ").pop();

  try {
    const data = jwt.verify(tokenJWT, "confidentialdata");

    if (!data) {
      return res.status(401).json({
        meta: {
          message: "Invalid token",
          code: 401,
          status: "error",
        },
        data: "Authentication failed",
      });
    }

    const user = await User.findByPk(data.data.id);

    if (!user) {
      return res.status(404).json({
        meta: {
          message: "User not found",
          code: 404,
          status: "error",
        },
        data: "Not found",
      });
    }

    // Menyimpan user_id ke dalam req
    req.user_id = user.id;

    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        meta: {
          message: "Token has expired",
          code: 401,
          status: "error",
        },
        data: "Authentication failed",
      });
    } else {
      console.log(error);
      return res.status(401).json({
        meta: {
          message: "Token verification failed",
          code: 401,
          status: "error",
        },
        data: "Authentication failed",
      });
    }
  }
};
