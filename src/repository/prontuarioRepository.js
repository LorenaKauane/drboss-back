let { prontuario, prontuario_anexo } = require("../../models");

exports.create = payload => {
  return prontuario
    .create(payload, {
      include: [
        {
          model: prontuario_anexo,
          as: "prontuario_anexo"
        }
      ]
    })
    .then(prontuario => prontuario);
};

exports.findOne = (payload, id) => {
  return prontuario
    .scope({ method: ["setTenant", payload.tenantId] }, "validaDelete")
    .findOne({
      where: {
        id: id
      },
      include: [
        {
          model: prontuario_anexo,
          as: "prontuario_anexo"
        }
      ]
    })
    .then(res => res);
};

exports.update = payload => {
  return prontuario
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
        throw new Error("Não foi possivel editar o prontuario!");
      }
    });
};

exports.delete = payload => {
  payload.destroyAt = new Date().toISOString().slice(0, 24);
  return prontuario
    .scope({ method: ["setTenant", payload.tenantId] })
    .destroy({
      where: {
        id: payload.id
      }
    })
    .then(res => {
      if (res == 1) {
        return res;
      } else {
        throw new Error("Não foi possivel deletar o prontuario!");
      }
    });
};

exports.deletePorPaciente = payload => {
  payload.destroyAt = new Date().toISOString().slice(0, 24);
  return prontuario
    .scope({ method: ["setTenant", payload.tenantId] })
    .destroy({
      where: {
        pacienteId: payload.id
      }
    })
    .then(res => res);
};

exports.findAll = tenantId => {
  return prontuario
    .scope({ method: ["setTenant", tenantId] }, "validaDelete")
    .findAll({
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: prontuario_anexo,
          as: "prontuario_anexo"
        }
      ]
    })
    .then(prontuario => prontuario);
};

exports.findAllForPaciente = (tenantId, pacienteId) => {
  return prontuario
    .scope({ method: ["setTenant", tenantId] }, "validaDelete")
    .findAll({
      include: [
        {
          model: prontuario_anexo,
          as: "prontuario_anexo"
        }
      ],
      where: {
        pacienteId: pacienteId
      },
      order: [["createdAt", "DESC"]]
    })
    .then(prontuario => prontuario);
};
