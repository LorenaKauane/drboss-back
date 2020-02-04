const prontuarioAnexoRepository = require("../repository/prontuarioAnexoRepository");
const deletarImagem = require("../util/deletarImagem");

exports.salvar = async (req, res, next) => {
  try {
    if (!req.body) {
      return res.status(400).send({ message: "Não foi possivel salvar" });
    }

    if (req.files.length > 0) {
      req.body.prontuarioAnexo_anexo = [];
      req.files.forEach(file =>
        req.body.prontuarioAnexo_anexo.push({ foto: file.originalname })
      );
    }

    const prontuarioAnexo = await prontuarioAnexoRepository.create(req.body);

    return res.status(200).send(prontuarioAnexo);
  } catch (error) {
    next(error);
  }
};

exports.deletar = async (req, res, next) => {
  try {
    if (!req.body) {
      return res
        .status(400)
        .send({ message: "Não foi possivel deletar o anexo!" });
    }

    const prontuarioAnexo = await prontuarioAnexoRepository.findOne(req.body);

    if (!prontuarioAnexo) {
      return res
        .status(400)
        .send({ message: "Não foi possivel encontrado o anexo" });
    }

    deletarImagem("prontuario", prontuarioAnexo_anexo.foto);

    await prontuarioAnexoRepository.destroyById(prontuarioAnexo.id);

    return res.status(200).send(prontuarioAnexo);
  } catch (error) {
    next(error);
  }
};
