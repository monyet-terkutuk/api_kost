const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Kost = sequelize.define(
    "Kost",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      informasi_kost: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      alamat: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fasilitas_umum: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fasilitas_kamar_mandi: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      fasilitas_kamar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      spek_kamar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      peraturan_kost: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      kategori_kost: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      harga: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      imb: {
        type: DataTypes.STRING,
        allowNull: true,
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
      tableName: "kosts",
      timestamps: true,
    }
  );

  return Kost;
};
