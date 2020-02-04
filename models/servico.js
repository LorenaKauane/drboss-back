'use strict';
module.exports = (sequelize, DataTypes) => {
  const servico = sequelize.define('servico', {
    nome:{
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nome não pode ser vazio"
        },
        len: {
          args: 3,
          msg: "O nome deve ter mais de 3 caracteres"
        }
      }
    },
    valor: DataTypes.DECIMAL,
    tenantId: DataTypes.STRING,
    destroyAt: DataTypes.DATE
  },{
    scopes: {
      setTenant: tenantId => {
        return {
          where: {
            tenantId: tenantId
          }
        };
      },
      validaDelete: {
        where: {
          destroyAt: null
        }
      }
    }
  });
  servico.associate = function(models) {
    // associations can be defined here
  };
  return servico;
};