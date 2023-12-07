"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("kosts", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER, // Assuming user_id is the foreign key referencing the users table's id
        allowNull: true,
        references: {
          model: "users",
          key: "id",
          onUpdate: "CASCADE",
          onDelete: "SET NULL", // Define the action upon deletion, you can adjust as needed
        },
      },
      informasi_kost: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      alamat: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fasilitas_umum: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fasilitas_kamar_mandi: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fasilitas_kamar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      spek_kamar: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      peraturan_kost: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      kategori_kost: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      harga: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      imb: {
        type: Sequelize.STRING,
        allowNull: true,
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
    await queryInterface.dropTable("kosts");
  },
};
