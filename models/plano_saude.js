'use strict';
module.exports = (sequelize, DataTypes) => {
  const plano_saude = sequelize.define('plano_saude', {
    nomeConvenio: DataTypes.STRING,
    plano: DataTypes.STRING,
    pacienteId:DataTypes.INTEGER
  }, {
    scopes: {
      setTenant: tenantId => {
        return {
          where: {
            tenantId: tenantId
          }
        };
      }
    }
  });

  return plano_saude;
};