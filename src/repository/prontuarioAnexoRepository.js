let { prontuario_anexo } = require("../../models");

exports.bulkCreate = (payload, tenantId) => {
  return prontuario_anexo.bulkCreate(payload).then(res => res);
};

exports.update = (payload, tenantId) => {
  return prontuario_anexo
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

exports.destroyByProntuario = prontuarioId => {
  return prontuario_anexo
    .destroy({
      where: {
        prontuarioId: prontuarioId
      }
    })
    .then(res => res);
};

exports.destroyById = payload => {
  return prontuario_anexo
    .destroy({
      where: {
        id: payload.id
      }
    })
    .then(res => res);
};

exports.findOne = (payload, tenantId) => {
  return prontuario_anexo
    .findAll({
      where: {
        id: payload.id
      },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: consulta_servico,
          as: "consulta_servico"
        }
      ]
    })
    .then(res => res);
};
