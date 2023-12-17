require("dotenv").config();
const { User } = require("../../../models");
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
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

  // Tambahkan validasi untuk ID pengguna
  const userId = req.params.id; // Pastikan Anda mengirim ID pengguna dalam URL atau request

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

  try {
    let user = await User.findByPk(userId); // Temukan pengguna berdasarkan ID

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: "error",
        data: {
          error: "User not found",
        },
      });
    }

    // Update data pengguna berdasarkan field yang dikirim dalam body
    user = await user.update({
      ...body,
      image_profile: file ? file.filename : user.image_profile, // Menggunakan file lama jika file baru tidak diunggah
      password: body.password
        ? bcrypt.hashSync(body.password, 10)
        : user.password, // Hash password baru jika ada
    });

    return res.json({
      code: 200,
      status: "success",
      data: {
        name: user.name,
        email: user.email,
        image_profile: user.image_profile,
      },
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "error",
      data: error.message,
    });
  }
};
