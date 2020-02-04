const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
 
  const usuario = sequelize.define(
    "usuario",
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
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email não pode ser vazio"
          },
          isEmail: {
            args: true,
            msg: "Endereço de email deve ser válido"
          }
        }
      },
      senha: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            args: true,
            msg: "Email não pode ser vazio"
          }
        }
      },
      planoId: DataTypes.INTEGER,
      tenantId: {
        allowNull: false,
        defaultValue: function () { return Date.now().toString(); },
        type: DataTypes.STRING,
        noUpdate: true
      }
    },
    {
      scopes: {
        setTenant: tenantId => {
          return {
            where: {
              tenantId: tenantId
            }
          };
        }
      },
      hooks: {
        beforeCreate: usuario => {
         
          const salt = bcrypt.genSaltSync();
          usuario.set('senha', bcrypt.hashSync(usuario.senha, salt));
        },
      },
    }
  );
  usuario.associate = models => {
    usuario.belongsTo(models.plano, { foreignKey: "planoId" });
  };
  return usuario;
};
