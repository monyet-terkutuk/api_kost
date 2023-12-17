const { Kost } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    // Periksa apakah Kost yang akan dihapus ditemukan
    const existingKost = await Kost.findByPk(req.params.kostId);

    if (!existingKost) {
      return res.status(404).json({
        code: 404,
        status: "error",
        data: {
          error: "Kost not found",
        },
      });
    }

    // Periksa apakah pengguna yang sedang login memiliki izin untuk menghapus Kost
    if (existingKost.user_id !== req.user.id) {
      return res.status(403).json({
        code: 403,
        status: "error",
        data: {
          error: "Permission denied",
        },
      });
    }

    // Hapus Kost
    await existingKost.destroy();

    return res.status(200).json({
      code: 200,
      status: "success",
      data: {
        message: "Kost deleted successfully",
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
