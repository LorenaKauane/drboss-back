const { parseISO } = require("date-fns");
const { pt } = require("date-fns/locale");
const { zonedTimeToUtc } = require("date-fns-tz");

exports.formataStringParaBanco = dataFormata => {
  const stringDay = dataFormata.substring(0, 2);
  const stringMonth = dataFormata.substring(3, 5);
  const stringYear = dataFormata.substring(6, 10);

  const dayComplete = parseISO(`${stringYear}-${stringMonth}-${stringDay}`);
  const znDate = zonedTimeToUtc(dayComplete, "America/Sao_Paulo");

  return znDate;
};
