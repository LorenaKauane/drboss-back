let { plano } = require("../../models");

exports.create = payload => {
  return plano.create(payload).then(plano => plano);
};

exports.update = payload => {
  return plano
    .update(payload, {
      where: {
        id: payload.id
      }
    })
    .then(res => {
      if (res == 1) {
        return payload;
      } else {
        throw new Error("Não foi possivel editar o plano!");
      }
    });
};

exports.delete = payload => {
  payload.destroyAt = new Date().toISOString().slice(0, 24);
  return plano
    .update(payload, {
      where: {
        id: payload.id
      }
    })
    .then(res => {
      if (res == 1) {
        return payload;
      } else {
        throw new Error("Não foi possivel deletar o plano!");
      }
    });
};

exports.findAll = () => {
  return plano.findAll().then(plano => plano);
};
