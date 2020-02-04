const PacienteRepository = require("../repository/pacienteRepository");
const PlanoSaudeRepository = require("../repository/planoSaudeRepository");
const ProntuarioRepository = require("../repository/prontuarioRepository");
const deletarImagem = require("../util/deletarImagem");

exports.salvar = async (req, res, next) => {
  try {
    const tenantId = req.headers.tenantid;
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel salvar" });
    }

    if (req.file) {
      req.body.image = req.file.originalname;
    } else {
      req.body.image = "SEMFOTO.png";
    }
    req.body.tenantId = tenantId;

    const paciente = await PacienteRepository.create(req.body);

    return res.status(200).send(paciente);
  } catch (error) {
    next(error);
  }
};

exports.editar = async (req, res, next) => {
  try {
    const tenantId = req.headers.tenantid;
    req.body.tenantId = tenantId;
    if (req.body && req.body.plano_saude) {
      await PlanoSaudeRepository.update(req.body.plano_saude);
    }

    const paciente = await PacienteRepository.findOne(req.body);

    if (!paciente) {
      return res.status(400).send({ message: "Não foi encontrado" });
    }

    if (req.body.image) {
      if (!paciente.image.includes("SEMFOTO")) {
        deletarImagem("paciente", paciente.image);
      }
    }

    if (req.file) {
      req.body.image = req.file.originalname;
    }

    await PacienteRepository.update(req.body);

    return res.status(200).send(req.body);
  } catch (error) {
    next(error);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    const { id } = req.params;
    req.body.id = id;
    const paciente = await PacienteRepository.findOne(req.body);

    if (!paciente) {
      return res.status(400).send({ message: "Não foi encontrado" });
    }

    await PacienteRepository.delete(paciente.dataValues);
    await ProntuarioRepository.deletePorPaciente(paciente.dataValues);

    if (paciente.image) {
      if (!paciente.image.includes("SEMFOTO")) {
        deletarImagem("paciente", paciente.image);
      }
    }

    return res.status(200).send({ message: "Paciente deletado" });
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    const pacientes = await PacienteRepository.findAll(req.body.tenantId);
    return res.status(200).send(pacientes);
  } catch (error) {
    next(error);
  }
};

exports.listarNome = async (req, res, next) => {
  try {
    const nome = req.params.nome;

    const pacientes = await PacienteRepository.findAllForName(
      req.body.tenantId,
      nome
    );
    return res.status(200).send(pacientes);
  } catch (error) {
    next(error);
  }
};
