"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("consulta", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pacienteId: {
        type: Sequelize.INTEGER,
        references: {
          model: "paciente",
          key: "id"
        }
      },
      tenantId: {
        allowNull: false,
        type: Sequelize.STRING
      },
      observacao: {
        type: Sequelize.STRING
      },
      dataConsulta: {
        type: Sequelize.DATE
      },
      statusConsulta: {
        type: Sequelize.STRING
      },
      horaInicio: {
        type: Sequelize.DATE
      },
      horaFim: {
        type: Sequelize.DATE
      },
      destroyAt: {
        type: Sequelize.DATE
      },
      valorDesconto: {
        type: Sequelize.DECIMAL
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
    return queryInterface.dropTable("consulta");
  }
};
