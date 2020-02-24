const UsuarioRepository = require("../repository/usuarioRepository");

exports.esqueciSenha = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não alterar a senha!" });
    }

    const usuario = await UsuarioRepository.esqueciSenha(req.body);
    return res.status(200).send(usuario);
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel alterar!" });
    }

    const usuario = await UsuarioRepository.update(req.body);
    return res.status(200).send(usuario);
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const usuario = await UsuarioRepository.findAll(req.body.tenantId);
    return res.status(200).send(usuario);
  } catch (error) {
    next(error);
  }
};
