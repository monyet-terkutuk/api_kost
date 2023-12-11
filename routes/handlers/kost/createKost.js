const { Kost } = require("../../../models");
const { User } = require("../../../models"); // Import model User jika belum diimport
const Validator = require("fastest-validator");
const v = new Validator();

const kostSchema = {
  informasi_kost: { type: "string", empty: false },
  alamat: { type: "string", empty: false },
  phone: { type: "string" },
  fasilitas_umum: { type: "string" },
  fasilitas_kamar_mandi: { type: "string" },
  fasilitas_kamar: { type: "string" },
  spek_kamar: { type: "string" },
  peraturan_kost: { type: "string" },
  status: { type: "string" },
  kategori_kost: { type: "string" },
  harga: { type: "number", integer: true },
  imb: { type: "string" },
  user_id: { type: "number", integer: true },
};

module.exports = async (req, res) => {
  const { body } = req;

  const validationResponse = v.validate(body, kostSchema);

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
    // Cek apakah user_id yang diberikan valid
    const existingUser = await User.findByPk(body.user_id);
    if (!existingUser) {
      return res.status(400).json({
        code: 400,
        status: "error",
        data: {
          error: "User not found",
        },
      });
    }

    const kost = await Kost.create(body);
    return res.status(200).json({
      code: 200,
      status: "success",
      data: {
        kost,
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
