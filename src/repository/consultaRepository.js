let {
  consulta,
  consulta_servico,
  servico,
  movimentacao_financeira,
  paciente
} = require("../../models");
const { parseISO, format } = require("date-fns");
const Op = require("../../models").Sequelize.Op;
const Sequelize = require("../../models").Sequelize;

exports.create = payload => {
  return consulta
    .create(payload, {
      include: [
        {
          model: consulta_servico,
          as: "consulta_servico"
        },
        {
          model: movimentacao_financeira,
          as: "movimentacao_financeira"
        }
      ]
    })
    .then(consulta => consulta);
};

exports.findOne = payload => {
  return consulta
    .scope({ method: ["setTenant", payload.tenantId] })
    .findOne({
      where: {
        id: payload.id
      },
      include: [
        {
          model: consulta_servico,
          as: "consulta_servico"
        }
      ],
      order: [["createdAt", "DESC"]]
    })
    .then(res => res);
};

exports.update = payload => {
  return consulta
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
        throw new Error("Não foi possivel editar o consulta!");
      }
    });
};

exports.delete = payload => {
  return consulta
    .scope({ method: ["setTenant", payload.tenantId] })
    .destroy({
      where: {
        id: payload.id
      }
    })
    .then(res => {
      if (res == 1) {
        return "Consulta deletada";
      } else {
        throw new Error("Não foi possivel deletar a consulta!");
      }
    });
};

exports.findAll = tenantId => {
  return consulta
    .scope({ method: ["setTenant", tenantId] }, "validaDelete")
    .findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: paciente,
          as: "paciente"
        },
        {
          model: consulta_servico,
          as: "consulta_servico",
          include: [
            {
              model: servico,
              as: "servico"
            }
          ]
        },
        {
          model: movimentacao_financeira,
          as: "movimentacao_financeira"
        }
      ]
    })
    .then(consulta => consulta);
};

exports.findAllForData = (tenantId, dtInicio, dtFim) => {
  return consulta
    .scope({ method: ["setTenant", tenantId] }, "validaDelete")
    .findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: paciente,
          as: "paciente"
        },
        {
          model: consulta_servico,
          as: "consulta_servico",
          include: [
            {
              model: servico,
              as: "servico"
            }
          ]
        },
        {
          model: movimentacao_financeira,
          as: "movimentacao_financeira"
        }
      ],
      where: {
        dataConsulta: {
          [Op.between]: [new Date(dtInicio), dtFim]
        }
      }
    })
    .then(consulta => consulta);
};

exports.findAllForStatus = (tenantId, dtInicio, dtFim) => {
  return consulta
    .scope({ method: ["setTenant", tenantId] }, "validaDelete")
    .findAll({
      attributes: [
        [Sequelize.literal(`DATE("dataConsulta")`), "date"],
        ["statusConsulta", "statusConsulta"]
      ],
      order: [["createdAt", "DESC"]],
      where: {
        dataConsulta: {
          [Op.between]: [dtInicio, dtFim]
        }
      }
    })
    .then(items => {
      const names = items.reduce((names, item, index) => {
        let dots = {
          key: index,
          color: item.statusConsulta.cor
        };

        if (!names[item.get("date")]) {
          names[item.get("date")] = { dots: [] };
        } else {
          names[item.get("date")].dots.push(dots);
        }
        return names;
      }, {});
      return names;
    });
};
