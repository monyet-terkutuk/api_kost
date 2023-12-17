const { Kost } = require("../../../models");
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
  // harga: { type: "number", integer: true },
  harga: { type: "string" },
};

module.exports = async (req, res) => {
  const { body, file } = req;

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
    body.harga = parseFloat(body.harga);
    body.user_id = req.user.id;

    const kost = await Kost.create({ ...body, imb: file.filename });
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
