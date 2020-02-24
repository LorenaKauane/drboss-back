const ENUM = require("../src/constant/enums");
const {
  parseISO,
  format,
  formatRelative,
  formatDistance
} = require("date-fns");
const { pt } = require("date-fns/locale");
const { zonedTimeToUtc } = require("date-fns-tz");
const { formataStringParaBanco } = require("../src/util/dataUtil");

module.exports = (sequelize, DataTypes) => {
  const prontuario = sequelize.define(
    "prontuario",
    {
      pacienteId: DataTypes.INTEGER,
      data: {
        type: DataTypes.DATE,
        get() {
          const formattedDate = format(
            new Date(this.getDataValue("data")),
            "dd/MM/yyyy"
          );
          return formattedDate;
        },
        set(valueToBeSet) {
          if (valueToBeSet) {
            this.setDataValue("data", formataStringParaBanco(valueToBeSet));
          }
        }
      },
      anotacoes: DataTypes.STRING,
      tenantId: DataTypes.STRING,
      destroyAt: DataTypes.DATE,
      statusProntuario: DataTypes.ENUM(ENUM.STATUS_PRONTUARIO)
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

  prontuario.associate = function(models) {
    prontuario.belongsTo(models.paciente, { foreignKey: "pacienteId" });
    prontuario.hasMany(models.prontuario_anexo, {
      as: "prontuario_anexo",
      foreignKey: "prontuarioId",
      onDelete: "CASCADE"
    });
  };
  return prontuario;
};
