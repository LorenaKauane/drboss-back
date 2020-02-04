module.exports.TIPO_PACIENTE = ['Particular','Convenio'];
module.exports.STATUS_PRONTUARIO = ['Em tratamento','Reagendar'];
module.exports.TIPO_MOVIMENTACAO = ['Entrada','Saida'];
module.exports.TIPO_PAGAMENTO = ['Dinheiro','Cartão'];

// 'Atendimento','Agendado','Confirmada','Cancelada'

const mapStatusConsulta = new Map();
mapStatusConsulta.set('Atendimento', {
    nome:"Atendimento",
    cor:"#faf994"
});
mapStatusConsulta.set('Agendado', {
    nome:"Agendado",
    cor:"#a0f0f0"
});

mapStatusConsulta.set('Confirmada', {
    nome:"Confirmada",
    cor:"#a9fca8"
});

mapStatusConsulta.set('Cancelado', {
    nome:"Cancelado",
    cor:"#ff9d8b"
});

module.exports.STATUS_CONSULTA = mapStatusConsulta;
// module.exports.STATUS_CONSULTA = [{
//     nome:"Atendimento",
//     cor:"#faf994"
// }, {
//     nome:"Agendado",
//     cor:"#a0f0f0"
// }, {
//     nome:"Confirmada",
//     cor:"#a9fca8"
// },{
//     nome:"Cancelada",
//     cor:"#ff9d8b"
// }];

