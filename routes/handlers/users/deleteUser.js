require("dotenv").config();
const connection = require("../../../config/db");

module.exports = async (req, res) => {
  try {
    const userId = req.params.id;

    const selectUserQuery = `SELECT * FROM users WHERE id = ${userId}`;

    connection.query(selectUserQuery, async (error, results) => {
      if (error) {
        return res.status(500).json({
          code: 500,
          status: "error",
          data: error.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          code: 404,
          status: "error",
          data: {
            error: "User not found",
          },
        });
      }

      const deleteUserQuery = `DELETE FROM users WHERE id = ${userId}`;

      connection.query(deleteUserQuery, (error, deletedUser) => {
        if (error) {
          return res.status(500).json({
            code: 500,
            status: "error",
            data: error.message,
          });
        }

        return res.json({
          code: 200,
          status: "success",
          data: {
            message: "User deleted successfully",
          },
        });
      });
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "error",
      data: error.message,
    });
  }
};
