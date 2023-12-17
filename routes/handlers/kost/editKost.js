const { Kost } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const { body, file } = req;

  try {
    // Periksa apakah Kost yang akan diupdate ditemukan
    let existingKost = await Kost.findByPk(req.params.kostId);

    if (!existingKost) {
      return res.status(404).json({
        code: 404,
        status: "error",
        data: {
          error: "Kost not found",
        },
      });
    }

    // Periksa apakah pengguna yang sedang login memiliki izin untuk mengedit Kost
    if (existingKost.user_id !== req.user.id) {
      return res.status(403).json({
        code: 403,
        status: "error",
        data: {
          error: "Permission denied",
        },
      });
    }

    existingKost = await existingKost.update({
      ...body,
      imb: file ? file.filename : existingKost.imb, // Menggunakan file lama jika file baru tidak diunggah
    });

    return res.status(200).json({
      code: 200,
      status: "success",
      data: {
        kost: existingKost,
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
