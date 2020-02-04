const ENUM = require("../constant/enums");

exports.listaEnums = async (req, res, next) => {
  try {
    const statusConsulta = []
    ENUM.STATUS_CONSULTA.forEach((value) => statusConsulta.push(value));

    const retorno = {
      tipoPagamento: ENUM.TIPO_PAGAMENTO,
      tipoMovimentacao: ENUM.TIPO_MOVIMENTACAO,
      statusProntuario: ENUM.STATUS_PRONTUARIO,
      tipoPaciente: ENUM.TIPO_PACIENTE,
      statusConsulta: statusConsulta,
    }


    return res.status(200).send(retorno);
  } catch (error) {
    next(error);
  }
};
