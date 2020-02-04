let { servico } = require("../../models");

exports.create = payload => {
  return servico.create(payload).then(servico => servico);
};

exports.update = (payload) => {
  return servico.scope({ method: ['setTenant', payload.tenantId] },'validaDelete')
    .update(payload, {
      where: {
        id: payload.id
      }
    })
    .then(res => {
      if (res == 1) {
        return payload;
      } else {
        throw new Error("Não foi possivel editar o servico!");
      }
    });
};

exports.delete = (payload) => {
  payload.destroyAt = new Date().toISOString().slice(0, 24);
  return servico.scope({ method: ['setTenant', payload.tenantId] },'validaDelete')
    .update(payload, {
      where: {
        id: payload.id
      }
    })
    .then(res => {
      if (res == 1) {
        return payload;
      } else {
        throw new Error("Não foi possivel deletar o servico!");
      }
    });
};

exports.findOne = (payload) => {
  return servico.scope({ method: ['setTenant', payload.tenantId] },'validaDelete')
    .findOne({
      where: {
        id: payload.id
      }
    })
    .then(res => res);
};

exports.findAll = tenantId => {
  return servico
    .scope({ method: ["setTenant", tenantId] }, "validaDelete")
    .findAll()
    .then(servico => servico);
};
