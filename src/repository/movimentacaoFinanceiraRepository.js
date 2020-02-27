let { movimentacao_financeira, consulta, paciente } = require("../../models");
const Op = require("../../models").Sequelize.Op;
const Sequelize = require("../../models").Sequelize;
exports.create = payload => {
  return movimentacao_financeira
    .create(payload)
    .then(movimentacao_financeira => movimentacao_financeira);
};

exports.findOne = payload => {
  return movimentacao_financeira
    .scope({ method: ["setTenant", payload.tenantId] }, "validaDelete")
    .findOne({
      where: {
        id: payload.id
      },
      order: [["createdAt", "DESC"]]
    })
    .then(res => res);
};

exports.update = (payload, tenantId) => {
  return movimentacao_financeira
    .scope({ method: ["setTenant", payload.tenantId] }, "validaDelete")
    .update(payload, {
      where: {
        id: payload.id
      }
    })
    .then(res => {
      if (res == 1) {
        return payload;
      } else {
        throw new Error("Não foi possivel editar a movimentação financeira!");
      }
    });
};

exports.delete = payload => {
  payload.destroyAt = new Date().toISOString().slice(0, 24);
  return movimentacao_financeira
    .scope({ method: ["setTenant", payload.tenantId] })
    .update(payload, {
      where: {
        id: payload.id
      }
    })
    .then(res => {
      if (res == 1) {
        return payload;
      } else {
        throw new Error("Não foi possivel deletar o movimentação financeira!");
      }
    });
};

exports.findAll = tenantId => {
  return movimentacao_financeira
    .findAll({
      include: [
        {
          model: consulta,
          as: "consulta",
          include: [
            {
              model: paciente,
              as: "paciente"
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]]
    })
    .then(movimentacao_financeira => movimentacao_financeira);
  // return movimentacao_financeira.scope({ method: ['setTenant', tenantId] },'validaDelete')
  //   .findAll({
  //     include:[{
  //       model:plano_saude,
  //       as:'plano_saude'
  //     }]
  //   })
  //   .then(movimentacao_financeira => movimentacao_financeira);
};

exports.findAllForData = (tenantId, dtInicio, dtFim) => {
  return movimentacao_financeira
    .scope({ method: ["setTenant", tenantId] }, "validaDelete")
    .findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: consulta,
          include: [
            {
              model: paciente,
              as: "paciente"
            }
          ]
        }
      ],
      where: {
        createdAt: {
          [Op.between]: [dtInicio, dtFim]
        }
      }
    })
    .then(movimentacao_financeira => movimentacao_financeira);
};
