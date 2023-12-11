const { User } = require("../../../models");

module.exports = async (req, res) => {
  try {
    const userId = req.params.id; // Ambil ID pengguna dari URL

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        code: 404,
        status: "error",
        data: {
          error: "User not found",
        },
      });
    }

    await user.destroy(); // Hapus pengguna dari database

    return res.json({
      code: 200,
      status: "success",
      data: {
        message: "User deleted successfully",
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
