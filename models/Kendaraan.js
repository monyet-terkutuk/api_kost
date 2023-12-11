const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Kendaraan = sequelize.define(
    "Kendaraan",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      info_kendaraan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      kategori_kendaraan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      peraturan_sewa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      spek_kendaraan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      lokasi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      syarat_sewa: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL",
        },
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
      tableName: "kendaraan",
      timestamps: true,
    }
  );

  return Kendaraan;
};
