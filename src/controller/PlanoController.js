const PlanoRepository = require("../repository/planoRepository");

exports.salvar = async (req, res, next) => {
  try {
    const plano = await PlanoRepository.create(req.body);
    return res.status(200).send(plano);
  } catch (error) {
    next(error);
  }
};

exports.editar = async (req, res, next) => {
  try {
    const plano = await PlanoRepository.update(req.body);
    return res.status(200).send(plano);
  } catch (error) {
    next(error);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    const plano = await PlanoRepository.delete(req.body);
    return res.status(200).send(plano);
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const planos = await PlanoRepository.findAll();
    return res.status(200).send(planos);
  } catch (error) {
    next(error);
  }
};
