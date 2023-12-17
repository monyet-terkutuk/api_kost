const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const GambarKost = sequelize.define(
    "GambarKost",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      gambar: {
        type: DataTypes.STRING, // Sesuaikan tipe data berdasarkan kebutuhan Anda (misalnya: DataTypes.TEXT, DataTypes.BLOB)
        allowNull: false,
      },
      kost_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "kosts",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE",
        },
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
      tableName: "gambar_kost",
      timestamps: true,
    }
  );

  GambarKost.associate = (models) => {
    GambarKost.belongsTo(models.Kost, {
      foreignKey: "kost_id",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return GambarKost;
};
