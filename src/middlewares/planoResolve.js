const UsuarioRepository = require("../repository/usuarioRepository");
const PlanoRepository = require("../repository/planoRepository");
const { differenceInDays } = require("date-fns");

module.exports = async (req, res, next) => {
  try {
    const tenantId = req.headers.tenantid;

    const usuarioLogado = await UsuarioRepository.findByTenant(tenantId);
    const planoUsuario = await PlanoRepository.findById(usuarioLogado.planoId);
    const diferençaDias = differenceInDays(
      usuarioLogado.dataUltimoPagamento,
      new Date()
    );

    if (diferençaDias > planoUsuario.quantidadeMaximoDias) {
      return res.status(500).send({
        message: `Ops, seu plano e o ${planoUsuario.nome} faça um upgrade para ter acesso a essa funcionalidade.`
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    throw new Error(`Ops, aconteceu alguma coisa.`);
  }
};
