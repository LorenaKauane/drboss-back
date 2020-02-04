const {
  parseISO,
  format,
  formatRelative,
  formatDistance,
  setHours,
  setMinutes
} = require("date-fns");
const { pt } = require("date-fns/locale");
const { zonedTimeToUtc } = require("date-fns-tz");
// const setHours = require("date-fns/set_hours");
const ENUM = require("../src/constant/enums");

module.exports = (sequelize, DataTypes) => {
  const consulta = sequelize.define(
    "consulta",
    {
      pacienteId: DataTypes.INTEGER,
      tenantId: DataTypes.STRING,
      observacao: DataTypes.STRING,
      dataConsulta: {
        type: DataTypes.DATE,
        get() {
          const formattedDate = format(
            new Date(this.getDataValue("dataConsulta")),
            "dd/MM/yyy hh:mm:ss"
          );
          return formattedDate;
        }
        // set(valueToBeSet) {
        //   // padrao DD-MM-YYYY
        //   console.log("entro");
        //   const year = valueToBeSet.subString(6, valueToBeSet.length);
        //   // const formattedDate = format(new Date(valueToBeSet), "YYYY-DD-MM");
        //   console.log(year);
        //   // const parsedDate = parseISO(valueToBeSet);
        //   // const znDate = zonedTimeToUtc(parsedDate, "America/Sao_Paulo");
        //   // this.setDataValue("dataConsulta", znDate);
        // }
      },
      statusConsulta: {
        type: DataTypes.STRING,
        get() {
          return ENUM.STATUS_CONSULTA.get(this.getDataValue("statusConsulta"));
        }
      },
      horaInicio: {
        type: DataTypes.DATE,
        get() {
          const formattedDate = format(
            new Date(this.getDataValue("horaInicio")),
            "HH:mm"
          );
          return formattedDate;
        },
        set(valueToBeSet) {
          if(valueToBeSet) {
            const znDate = zonedTimeToUtc(new Date(), "America/Sao_Paulo");

            const hour = valueToBeSet.substring(0, 2);
            const minute = valueToBeSet.substring(3, 5);
            const horasComMinutos = setHours(znDate, hour);
            const horaInicio = setMinutes(horasComMinutos, minute);
  
            this.setDataValue("horaInicio", horaInicio);
          }

        }
      },
      horaFim: {
        type: DataTypes.DATE,
        get() {
          const formattedDate = format(
            new Date(this.getDataValue("horaFim")),
            "HH:mm"
          );
          return formattedDate;
        },
        set(valueToBeSet) {
          if(valueToBeSet) {
            const znDate = zonedTimeToUtc(new Date(), "America/Sao_Paulo");

            const hour = valueToBeSet.substring(0, 2);
            const minute = valueToBeSet.substring(3, 5);
            const horasComMinutos = setHours(znDate, hour);
            const horaFim = setMinutes(horasComMinutos, minute);
  
            this.setDataValue("horaFim", horaFim);
          }
        }
      },
      destroyAt: DataTypes.DATE,
      valorDesconto: DataTypes.DECIMAL
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
  consulta.associate = function(models) {
    consulta.belongsTo(models.paciente, { foreignKey: "pacienteId" });
    consulta.hasMany(models.consulta_servico, {
      as: "consulta_servico",
      foreignKey: "consultaId",
      onDelete: "CASCADE"
    });
    consulta.hasOne(models.movimentacao_financeira, {
      foreignKey: "consultaId",
      onDelete: "CASCADE"
    });
  };
  return consulta;
};
