let { usuario } = require("../../models");
const bCrypt = require("bcrypt");

let generateHash = function(senha) {
  return bCrypt.hashSync(senha, bCrypt.genSaltSync(8), null);
};

exports.create = payload => {
  return usuario.create(payload).then(usuario => usuario);
};

exports.update = payload => {
  return usuario
    .scope({ method: ["setTenant", payload.tenantId] })
    .update(payload, {
      where: {
        email: payload.email
      }
    });
};

exports.esqueciSenha = payload => {
  payload.senha = generateHash(payload.novaSenha);
  return usuario
    .scope({ method: ["setTenant", payload.tenantId] })
    .update(payload, {
      where: {
        email: payload.email
      }
    });
};

exports.findByEmail = email => {
  return usuario.findOne({
    where: {
      email: email
    }
  });
};
exports.findById = id => {
  return usuario
    .findOne({
      where: {
        id: id
      }
    })
    .then(usuario => usuario);
};

exports.findByTenant = tenantId => {
  return usuario
    .findOne({
      where: {
        tenantId: tenantId
      }
    })
    .then(usuario => usuario);
};

exports.findAll = tenantId => {
  return usuario
    .scope({ method: ["setTenant", tenantId] })
    .findAll()
    .then(servico => servico);
};
