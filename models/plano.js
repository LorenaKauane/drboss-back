"use strict";
module.exports = (sequelize, DataTypes) => {
  const plano = sequelize.define(
    "plano",
    {
      nome: {
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
      preco: DataTypes.DOUBLE,
      destroyAt: DataTypes.DATE
    },
    {}
  );

  return plano;
};
