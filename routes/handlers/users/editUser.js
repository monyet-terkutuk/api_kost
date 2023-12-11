const bcrypt = require("bcrypt");
const connection = require("../../../config/db");
const Validator = require("fastest-validator");
require("dotenv").config();

const v = new Validator();

const userSchema = {
  name: { type: "string", optional: true, max: 255 },
  email: { type: "email", optional: true },
  password: { type: "string", min: 8, optional: true },
  phone: { type: "number", integer: true, optional: true },
  address: { type: "string", optional: true },
};

module.exports = async (req, res) => {
  const { body, file } = req;

  const userId = req.params.id;

  const validationResponse = v.validate(body, userSchema);

  if (validationResponse !== true) {
    return res.status(400).json({
      code: 400,
      status: "error",
      data: {
        error: "Validation failed",
        details: validationResponse,
      },
    });
  }

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

    let user = results[0];

    const updateFields = {
      name: body.name || user.name,
      email: body.email || user.email,
      phone: body.phone || user.phone,
      address: body.address || user.address,
      image_profile: file ? file.filename : user.image_profile,
      password: body.password
        ? bcrypt.hashSync(body.password, 10)
        : user.password,
    };

    const updateUserQuery = `UPDATE users SET ? WHERE id = ${userId}`;

    connection.query(updateUserQuery, updateFields, (error, updatedUser) => {
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
          name: updateFields.name,
          email: updateFields.email,
          image_profile: updateFields.image_profile,
        },
      });
    });
  });
};
