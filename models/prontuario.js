const ENUM = require("../src/constant/enums");
const {
  parseISO,
  format,
  formatRelative,
  formatDistance
} = require("date-fns");
const { pt } = require("date-fns/locale");
const { zonedTimeToUtc } = require("date-fns-tz");

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
          //padrao DD-MM-YYYY
          const year = valueToBeSet.substring(6, valueToBeSet.length);
          const month = valueToBeSet.substring(3, 5);
          const day = valueToBeSet.substring(0, 2);

          const parsedDate = parseISO(`${year}-${month}-${day}`);
          const znDate = zonedTimeToUtc(parsedDate, "America/Sao_Paulo");
          this.setDataValue("data", znDate);
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
