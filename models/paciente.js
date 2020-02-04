const ENUM = require("../src/constant/enums");

module.exports = (sequelize, DataTypes) => {
  const paciente = sequelize.define(
    "paciente",
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
      email: DataTypes.STRING,
      telefone1: DataTypes.STRING,
      telefone2: DataTypes.STRING,
      tipoPaciente: DataTypes.ENUM(ENUM.TIPO_PACIENTE),
      nascimento: DataTypes.DATE,
      image: DataTypes.STRING,
      observacao: DataTypes.STRING,
      endereco: DataTypes.STRING,
      cidade: DataTypes.STRING,
      bairro: DataTypes.STRING,
      tenantId: DataTypes.STRING,
      destroyAt: DataTypes.DATE,
      sexo: DataTypes.ENUM("F", "M"),
      cor: DataTypes.STRING
    },
    {
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
    }
  );
  paciente.associate = function(models) {
    paciente.hasOne(models.plano_saude, {
      foreignKey: "pacienteId",
      onDelete: "CASCADE"
    });
    paciente.hasOne(models.prontuario, {
      foreignKey: "pacienteId",
      onDelete: "CASCADE"
    });
  };
  return paciente;
};
