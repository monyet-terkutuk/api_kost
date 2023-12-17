const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const GambarKendaraan = sequelize.define(
    "GambarKendaraan",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      kendaraan_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gambar: {
        type: DataTypes.STRING, // Sesuaikan tipe data berdasarkan kebutuhan Anda (misalnya: DataTypes.TEXT, DataTypes.BLOB)
        allowNull: false,
      },
      utama: {
        type: DataTypes.BOOLEAN, // Fix the typo here
        allowNull: false,
        defaultValue: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "created_at",
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        field: "updated_at",
      },
    },
    {
      tableName: "gambar_kendaraan",
      timestamps: true,
    }
  );

  GambarKendaraan.associate = (models) => {
    GambarKendaraan.belongsTo(models.Kendaraan, {
      foreignKey: "kendaraan_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GambarKendaraan;
};
