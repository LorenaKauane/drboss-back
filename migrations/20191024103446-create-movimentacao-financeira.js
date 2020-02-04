'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('movimentacao_financeira', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      valor: {
        type: Sequelize.DECIMAL
      },
      consultaId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references : {
          model: 'consulta',
					key: 'id'
        }
      },
      tenantId: {
        allowNull: false,
				type: Sequelize.STRING
      },
      tipoMovimentacao: {
        type: Sequelize.STRING
      },
      tipoPagamento: {
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
    return queryInterface.dropTable('movimentacao_financeira');
  }
};