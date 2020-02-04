"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("prontuario", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pacienteId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: "paciente",
          key: "id"
        }
      },
      data: {
        type: Sequelize.DATE
      },
      anotacoes: {
        type: Sequelize.STRING
      },
      tenantId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      destroyAt: {
        type: Sequelize.DATE
      },
      statusProntuario: {
        type: Sequelize.STRING
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
    return queryInterface.dropTable("prontuario");
  }
};
