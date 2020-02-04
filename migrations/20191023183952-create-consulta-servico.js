"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("consulta_servico", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      consultaId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "consulta",
          key: "id"
        }
      },
      servicoId: {
        type: Sequelize.INTEGER,
        references: {
          model: "servico",
          key: "id"
        }
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
    return queryInterface.dropTable("consulta_servico");
  }
};
