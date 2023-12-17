const { Kost, GambarKost } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  try {
    // Mendapatkan semua data Kost
    const allKosts = await Kost.findAll();

    // Mendapatkan gambar utama untuk setiap Kost
    const imagesPerKost = await Promise.all(
      allKosts.map(async (kost) => {
        const kostId = kost.id;
        const mainImage = await GambarKost.findOne({
          where: { kost_id: kostId, utama: true },
        });

        return {
          kost_id: kostId,
          main_image: mainImage ? mainImage.gambar : null,
        };
      })
    );

    // Menggabungkan hasil query Kost dan GambarKost
    const kostsWithImages = allKosts.map((kost) => {
      const kostId = kost.id;
      const imageInfo = imagesPerKost.find((img) => img.kost_id === kostId);
      return {
        ...kost.toJSON(),
        images: imageInfo ? [imageInfo.main_image] : null,
      };
    });

    return res.status(200).json({
      code: 200,
      status: "success",
      data: {
        kosts: kostsWithImages,
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
