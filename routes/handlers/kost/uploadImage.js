const { GambarKost, Kost } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const { kostId } = req.params;

    // Pastikan Kost dengan ID yang sesuai ada dalam database
    const kost = await Kost.findByPk(kostId);
    if (!kost) {
      return res.status(404).json({
        code: 404,
        status: "error",
        data: {
          error: "Kost not found",
        },
      });
    }

    // Simpan informasi gambar ke dalam tabel GambarKost
    const image = req.file.filename;
    const isPrimary = req.body.primary === "true"; // Make sure it's a boolean

    await GambarKost.create({
      gambar: image,
      kost_id: kostId,
      utama: isPrimary,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return res.status(201).json({
      code: 201,
      status: "success",
      data: {
        message: "Image uploaded successfully",
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
