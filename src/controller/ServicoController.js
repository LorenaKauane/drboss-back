const ServicoRepository = require("../repository/ServicoRepository");

exports.salvar = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel salvar" });
    }

    const servico = await ServicoRepository.create(req.body);

    return res.status(200).send(servico);
  } catch (error) {
    next(error);
  }
};

exports.editar = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel salvar" });
    }

    const servico = await ServicoRepository.findOne(req.body);

    if (!servico) {
      return res.status(400).send({ message: "Não foi encontrado" });
    }

    await ServicoRepository.update(req.body);

    return res.status(200).send(req.body);
  } catch (error) {
    next(error);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    const tenantId = req.headers.tenantid;
    req.body.tenantId = tenantId;
    const { id } = req.params;

    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel deletar!" });
    }
    req.body.id = id;
    const servico = await ServicoRepository.findOne(req.body);

    if (!servico) {
      return res.status(400).send({ message: "Não foi encontrado" });
    }

    const servicoDeletado = await ServicoRepository.delete(servico.dataValues);
    return res.status(200).send(servicoDeletado);
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    //Testar
    const servicos = await ServicoRepository.findAll(req.body.tenantId);
    return res.status(200).send(servicos);
  } catch (error) {
    next(error);
  }
};
