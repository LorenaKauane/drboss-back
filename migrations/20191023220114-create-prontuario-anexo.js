"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("prontuario_anexo", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      prontuarioId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "prontuario",
          key: "id"
        }
      },
      foto: {
        type: Sequelize.STRING
      },
      destroyAt: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("prontuario_anexo");
  }
};
