let { consulta_servico } = require("../../models");

exports.destroy = consultaId => {
  return consulta_servico
    .destroy({
      where: {
        consultaId: consultaId
      }
    })
    .then(res => res);
};

exports.bulkCreate = (payload, tenantId) => {
  return consulta_servico
    .bulkCreate(payload, {
      fields: ["id", "servicoId", "consultaId"],
      updateOnDuplicate: ["servicoId"]
    })
    .then(res => res);
};
