"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("gambar_kendaraan", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      kendaraan_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "kendaraan",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "CASCADE", // Adjust deletion action as needed
        },
      },
      utama: {
        type: Sequelize.BOOLEAN, // Fix the typo here
        allowNull: false,
        defaultValue: false,
      },
      gambar: {
        type: Sequelize.STRING, // Adjust data type as required (e.g., TEXT, BLOB)
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint("gambar_kendaraan", {
      type: "foreign key",
      fields: ["kendaraan_id"],
      name: "fk_gambar_kendaraan_kendaraan",
      references: {
        table: "kendaraan",
        field: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint(
      "gambar_kendaraan",
      "fk_gambar_kendaraan_kendaraan"
    );
    await queryInterface.dropTable("gambar_kendaraan");
  },
};
