const ProntuarioRepository = require("../repository/ProntuarioRepository");
const ProntuarioAnexoRepository = require("../repository/prontuarioAnexoRepository");
const deletarImagem = require("../util/deletarImagem");

exports.salvar = async (req, res, next) => {
  try {
    const tenantId = req.headers.tenantid;
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel salvar" });
    }

    if (req.files && req.files.length > 0) {
      req.body.prontuario_anexo = [];
      req.files.forEach(file =>
        req.body.prontuario_anexo.push({ foto: file.originalname })
      );
    }
    req.body.tenantId = tenantId;
    const prontuario = await ProntuarioRepository.create(req.body);

    return res.status(200).send(prontuario);
  } catch (error) {
    next(error);
  }
};

////Editar ou apagar os anexos, validar
exports.editar = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel editar!" });
    }

    const prontuario = await ProntuarioRepository.findOne(req.body);

    if (!prontuario) {
      return res
        .status(400)
        .send({ message: "Não foi encontrado o prontuario!" });
    }

    if (req.files.length > 0) {
      let fotos = [];
      req.files.forEach(file =>
        fotos.push({ foto: file.originalname, prontuarioId: prontuario.id })
      );

      await ProntuarioAnexoRepository.bulkCreate(fotos);
    }

    await ProntuarioRepository.update(prontuario);

    return res.status(200).send(prontuario);
  } catch (error) {
    next(error);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel deletar!" });
    }

    const prontuarioId = req.params.id;

    const prontuario = await ProntuarioRepository.findOne(
      req.body,
      prontuarioId
    );

    if (!prontuario) {
      return res
        .status(400)
        .send({ message: "Não foi encontrado o prontuario para deletar!" });
    }

    if (prontuario.prontuario_anexo.length > 0) {
      prontuario.prontuario_anexo.forEach(prontuario_anexo =>
        deletarImagem("prontuario", prontuario_anexo.foto)
      );
      await ProntuarioAnexoRepository.destroyByProntuario(prontuario.id);
    }

    await ProntuarioRepository.delete(prontuario.dataValues);

    return res.status(200).send(prontuario);
  } catch (error) {
    next(error);
  }
};

exports.listar = async (req, res, next) => {
  try {
    //Testar
    const prontuarios = await ProntuarioRepository.findAll(req.body.tenantId);
    return res.status(200).send(prontuarios);
  } catch (error) {
    next(error);
  }
};

exports.findAllForPaciente = async (req, res, next) => {
  try {
    const pacienteId = req.params.pacienteId;
    const prontuarios = await ProntuarioRepository.findAllForPaciente(
      req.body.tenantId,
      pacienteId
    );
    return res.status(200).send(prontuarios);
  } catch (error) {
    next(error);
  }
};
