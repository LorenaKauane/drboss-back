let { plano_saude } = require("../../models");

exports.update = (payload, tenantId) => {
  return plano_saude
    .update(payload, {
      where: {
        id: payload.id
      }
    })
    .then(res => {
      if (res == 1) {
        return payload;
      } else {
        throw new Error("Não foi possivel editar o plano de saude!");
      }
    });
  // return plano_saude.scope({ method: ['setTenant', tenantId] })
  //   .update(payload, {
  //     where: {
  //       id: payload.id
  //     }
  //   })
  //   .then(res => {
  //     if (res == 1) {
  //       return payload;
  //     } else {
  //       throw new Error("Não foi possivel editar o plano de saude!");
  //     }
  //   });
};
