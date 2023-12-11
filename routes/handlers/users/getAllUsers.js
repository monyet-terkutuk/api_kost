require("dotenv").config();
const connection = require("../../../config/db");

module.exports = async (req, res) => {
  try {
    const selectUsersQuery =
      "SELECT id, name, email, phone, address FROM users";

    connection.query(selectUsersQuery, (error, results) => {
      if (error) {
        return res.status(500).json({
          meta: {
            message: "Failed to get users",
            code: 500,
            status: "error",
          },
          data: error.message,
        });
      }

      return res.json({
        meta: {
          message: "Get all users successfully",
          code: 200,
          status: "success",
        },
        data: results,
      });
    });
  } catch (error) {
    return res.status(500).json({
      meta: {
        message: "Failed to get users",
        code: 500,
        status: "error",
      },
      data: error.message,
    });
  }
};
