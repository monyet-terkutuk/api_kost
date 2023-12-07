"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("kendaraan", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      info_kendaraan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kategori_kendaraan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      peraturan_sewa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      spek_kendaraan: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      lokasi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      syarat_sewa: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL", // Change the deletion action as required
        },
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("kendaraan");
  },
};
