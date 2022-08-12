const ENUM = require("../src/constant/enums");

module.exports = (sequelize, DataTypes) => {
  const movimentacao_financeira = sequelize.define(
    "movimentacao_financeira",
    {
      valor: DataTypes.DECIMAL,
      consultaId: DataTypes.INTEGER,
      tenantId: DataTypes.STRING,
      tipoMovimentacao: DataTypes.ENUM(ENUM.TIPO_MOVIMENTACAO),
      tipoPagamento: DataTypes.ENUM(ENUM.TIPO_PAGAMENTO),
      destroyAt: DataTypes.DATE
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
  movimentacao_financeira.associate = function(models) {
    movimentacao_financeira.belongsTo(models.consulta, {
      foreignKey: "consultaId",
      onDelete: "CASCADE"
    });
  };
  return movimentacao_financeira;
};
