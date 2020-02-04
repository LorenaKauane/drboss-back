'use strict';
module.exports = (sequelize, DataTypes) => {
  const consulta_servico = sequelize.define('consulta_servico', {
    consultaId: DataTypes.INTEGER,
    servicoId: DataTypes.INTEGER
  }, {});
  consulta_servico.associate = function(models) {
    consulta_servico.belongsTo(models.consulta, { foreignKey: "consultaId", onDelete: 'CASCADE'  });
    consulta_servico.belongsTo(models.servico, { foreignKey: "servicoId" });
  };
  return consulta_servico;
};