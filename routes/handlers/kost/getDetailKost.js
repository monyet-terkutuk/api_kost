const { Kost, User, GambarKost } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    const kostId = req.params.kostId;

    // Mendapatkan detail Kost berdasarkan ID
    const kostDetail = await Kost.findByPk(kostId);

    if (!kostDetail) {
      return res.status(404).json({
        code: 404,
        status: "error",
        data: {
          error: "Kost not found",
        },
      });
    }

    // Mendapatkan informasi pengguna berdasarkan user_id
    const userInfo = await User.findByPk(kostDetail.user_id, {
      attributes: ["name", "email", "phone", "address"],
    });

    if (!userInfo) {
      return res.status(404).json({
        code: 404,
        status: "error",
        data: {
          error: "User not found",
        },
      });
    }

    // Mendapatkan semua gambar berdasarkan kost_id
    const allGambarKost = await GambarKost.findAll({
      where: { kost_id: kostId },
    });

    // Menggabungkan hasil query
    const combinedResult = {
      kost: {
        ...kostDetail.toJSON(),
        owner: userInfo.toJSON(),
        gambar_kost: allGambarKost.map((gambar) => gambar.toJSON()),
      },
    };

    return res.status(200).json({
      code: 200,
      status: "success",
      data: combinedResult,
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      status: "error",
      data: error.message,
    });
  }
};
