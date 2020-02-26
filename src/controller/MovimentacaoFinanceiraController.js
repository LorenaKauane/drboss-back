const movimentacaoFinanceiraRepository = require("../repository/movimentacaoFinanceiraRepository");

exports.salvar = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel salvar" });
    }

    const movimentacaoFinanceira = await movimentacaoFinanceiraRepository.create(
      req.body
    );

    return res.status(200).send(movimentacaoFinanceira);
  } catch (error) {
    next(error);
  }
};

exports.editar = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel salvar" });
    }

    const movimentacaoFinanceira = await movimentacaoFinanceiraRepository.findOne(
      req.body
    );

    if (!movimentacaoFinanceira) {
      return res.status(400).send({ message: "Não foi encontrado" });
    }

    await movimentacaoFinanceiraRepository.update(req.body);

    return res.status(200).send(req.body);
  } catch (error) {
    next(error);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel deletar!" });
    }

    const movimentacaoFinanceira = await movimentacaoFinanceiraRepository.findOne(
      req.body
    );

    if (!movimentacaoFinanceira) {
      return res.status(400).send({ message: "Não foi encontrado" });
    }

    const movimentacaoFinanceiraDeletado = await movimentacaoFinanceiraRepository.delete(
      movimentacaoFinanceira.dataValues
    );

    return res.status(200).send(movimentacaoFinanceiraDeletado);
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const dtInicio = req.params.dtInicio;
    const dtFim = req.params.dtFim;

    const movimentacaoFinanceiras = await movimentacaoFinanceiraRepository.findAllForData(
      req.body.tenantId,
      dtInicio,
      dtFim
    );
    return res.status(200).send(movimentacaoFinanceiras);
  } catch (error) {
    next(error);
  }
};
