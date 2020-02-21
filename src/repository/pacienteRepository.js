let {
  paciente,
  plano_saude,
  prontuario,
  prontuario_anexo
} = require("../../models");
const Op = require("../../models").Sequelize.Op;

exports.create = payload => {
  return paciente
    .create(payload, {
      include: [
        {
          model: plano_saude,
          as: "plano_saude"
        }
      ]
    })
    .then(paciente => paciente);
};

exports.update = payload => {
  return paciente
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
        throw new Error("Não foi possivel editar o paciente!");
      }
    });
};

exports.delete = payload => {
  payload.destroyAt = new Date().toISOString().slice(0, 24);
  return paciente
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
        throw new Error("Não foi possivel deletar o paciente!");
      }
    });
};

exports.findOne = payload => {
  return paciente
    .scope({ method: ["setTenant", payload.tenantId] }, "validaDelete")
    .findOne({
      where: {
        id: payload.id
      },
      order: [["createdAt", "DESC"]]
    })
    .then(res => res);
};

exports.findAll = tenantId => {
  return paciente
    .scope({ method: ["setTenant", tenantId] }, "validaDelete")
    .findAll({
      include: [
        {
          model: plano_saude,
          as: "plano_saude"
        }
      ],
      order: [["createdAt", "DESC"]]
    })
    .then(paciente => paciente);
};

exports.findAllForName = (tenantId, nome) => {
  return paciente
    .scope({ method: ["setTenant", tenantId] }, "validaDelete")
    .findAll({
      where: {
        nome: {
          [Op.like]: "%" + nome + "%"
        }
      },
      include: [
        {
          model: plano_saude,
          as: "plano_saude"
        }
      ],
      order: [["createdAt", "DESC"]]
    })
    .then(paciente => paciente);
};
