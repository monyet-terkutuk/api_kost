const bcrypt = require("bcrypt");
const mysql = require("mysql");
const Validator = require("fastest-validator");
require("dotenv").config();
const connection = require("../../../config/db");

const v = new Validator();

const userSchema = {
  name: { type: "string", empty: false, max: 255 },
  email: { type: "email", empty: false },
  password: { type: "string", min: 8, empty: false },
  phone: { type: "number", integer: true },
  address: { type: "string" },
};

module.exports = async (req, res) => {
  const { body } = req;

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

  const checkEmailQuery = `SELECT * FROM users WHERE email = '${body.email}'`;
  connection.query(checkEmailQuery, async (error, results) => {
    if (error) {
      return res.status(500).json({
        code: 500,
        status: "error",
        data: error.message,
      });
    }

    if (results.length > 0) {
      return res.status(400).json({
        code: 400,
        status: "error",
        data: {
          error: "Email has been used",
        },
      });
    }

    const password = bcrypt.hashSync(body.password, 10);
    const createUserQuery = `
      INSERT INTO users (name, email, password, phone, address)
      VALUES ('${body.name}', '${body.email}', '${password}', '${body.phone}', '${body.address}')
    `;

    connection.query(createUserQuery, (error, results) => {
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
          name: body.name,
          email: body.email,
        },
      });
    });
  });
};
