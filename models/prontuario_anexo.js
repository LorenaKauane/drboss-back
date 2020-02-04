"use strict";
module.exports = (sequelize, DataTypes) => {
  const prontuario_anexo = sequelize.define(
    "prontuario_anexo",
    {
      prontuarioId: DataTypes.INTEGER,
      foto: DataTypes.STRING,
      destroyAt: DataTypes.DATE
    },
    {
      scopes: {
        validaDelete: {
          where: {
            destroyAt: null
          }
        }
      }
    }
  );
  prontuario_anexo.associate = function(models) {
    // prontuario_anexo.belongsTo(models.prontuario, {
    //   foreignKey: "prontuarioId"
    // });
    prontuario_anexo.belongsTo(models.prontuario, {
      as: "prontuario",
      foreignKey: "prontuarioId"
    });
  };
  return prontuario_anexo;
};
