const ConsultaRepository = require("../repository/ConsultaRepository");
const ConsultaServicoRepository = require("../repository/consultaServicoRepository");
const MovimentacaoFinanceiraRepository = require("../repository/movimentacaoFinanceiraRepository");

exports.salvar = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel salvar" });
    }

    if (req.body.movimentacao_financeira) {
      req.body.movimentacao_financeira.tenantId = req.body.tenantId;
    }

    const consulta = await ConsultaRepository.create(req.body);
    
    return res.status(200).send(consulta);
  } catch (error) {
    next(error);
  }
};

exports.editar = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel editar!" });
    }

    const consulta = await ConsultaRepository.findOne(req.body);

    if (!consulta) {
      return res
        .status(400)
        .send({ message: "Não foi encontrado a consulta para editar!" });
    }

    if (req.body.consulta_servico) {
      await ConsultaServicoRepository.destroy(consulta.id);
      await ConsultaServicoRepository.bulkCreate(req.body.consulta_servico);
    }

    await ConsultaRepository.update(req.body);

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

    const consulta = await ConsultaRepository.findOne(req.body);


    if (!consulta) {
      return res
        .status(400)
        .send({ message: "Não foi encontrado a consulta para editar!" });
    }

    if (consulta.consulta_servico) {
      await ConsultaServicoRepository.destroy(consulta.id);
    }

    const consultaDeletado = await ConsultaRepository.delete(consulta.dataValues);

    return res.status(200).send(consultaDeletado);
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    //Testar
    const servicos = await ConsultaRepository.findAll(req.body.tenantId);
    return res.status(200).send(servicos);
  } catch (error) {
    next(error);
  }
};

exports.listarPorData = async (req, res, next) => {
  try {
    const dtInicio =  req.params.dtInicio;
    const dtFim = req.params.dtFim

    const servicos = await ConsultaRepository.findAllForData(req.body.tenantId,dtInicio,dtFim);
    return res.status(200).send(servicos);
  } catch (error) {
    next(error);
  }
};

exports.listaPorStatusConsulta = async (req, res, next) => {
  try {
    const dtInicio =  req.params.dtInicio;
    const dtFim = req.params.dtFim

    const servicos = await ConsultaRepository.findAllForStatus(req.body.tenantId,dtInicio,dtFim);
    return res.status(200).send(servicos);
  } catch (error) {
    next(error);
  }
};