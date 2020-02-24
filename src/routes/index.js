let express = require("express");
let rotas = express.Router();
const multer = require("multer");
const tenantResolve = require("../middlewares/tenantResolve");
const planoResolve = require("../middlewares/planoResolve");
const autenticacao = require("../../autenticacao")();

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, global._srcImage.concat(req.path));
  },
  filename: (req, file, callback) => {
    file.originalname = `${Date.now()}.${file.originalname.split(".")[1]}`;
    req.body.tenantId = req.headers.tenantid;
    callback(null, file.originalname);
  }
});

const photoUpload = multer({ storage: storage });
const PlanoController = require("../controller/PlanoController");
const UsuarioController = require("../controller/UsuarioController");
const PacienteController = require("../controller/PacienteController");
const ServicoController = require("../controller/ServicoController");
const ConsultaController = require("../controller/ConsultaController");
const ProntuarioController = require("../controller/ProntuarioController");
const ProntuarioAnexoController = require("../controller/ProntuarioAnexoController");
const MovimentacaoFinanceiraController = require("../controller/MovimentacaoFinanceiraController");
const AutenticacaoController = require("../controller/AutenticacaoController");
const enumController = require("../controller/enumController");
//auth.authenticate()
//Plano
rotas.post("/plano", PlanoController.salvar);
rotas.put("/plano", PlanoController.editar);
rotas.delete("/plano", PlanoController.deletar);
rotas.get("/plano", PlanoController.listar);

//Autenticacao
rotas.post("/autenticacao", AutenticacaoController.validaLogin);
rotas.post("/autenticacao/cria-conta", AutenticacaoController.criaConta);

//Usuario
rotas.put(
  "/usuario/esqueci-senha",
  tenantResolve,
  UsuarioController.esqueciSenha
);
rotas.put("/usuario", tenantResolve, UsuarioController.update);
rotas.get(
  "/usuario",
  [tenantResolve, autenticacao.authenticate()],
  UsuarioController.listar
);

//Paciente
rotas.post(
  "/paciente",
  [
    planoResolve,
    tenantResolve,
    photoUpload.single("file"),
    autenticacao.authenticate()
  ],
  PacienteController.salvar
);
rotas.put(
  "/paciente",
  [
    planoResolve,
    tenantResolve,
    photoUpload.single("file"),
    autenticacao.authenticate()
  ],
  PacienteController.editar
);
rotas.delete(
  "/paciente/:id",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  PacienteController.deletar
);
rotas.get(
  "/paciente",
  [tenantResolve, autenticacao.authenticate()],
  PacienteController.listar
);
rotas.get(
  "/paciente/:nome",
  [tenantResolve, autenticacao.authenticate()],
  PacienteController.listarNome
);

//Serviço
rotas.post(
  "/servico",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  ServicoController.salvar
);
rotas.put(
  "/servico",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  ServicoController.editar
);
rotas.delete(
  "/servico/:id",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  ServicoController.deletar
);
rotas.get(
  "/servico",
  [tenantResolve, autenticacao.authenticate()],
  ServicoController.listar
);

//Consulta
rotas.post(
  "/consulta",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  ConsultaController.salvar
);
rotas.put(
  "/consulta",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  ConsultaController.editar
);
rotas.delete(
  "/consulta",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  ConsultaController.deletar
);
rotas.get(
  "/consulta",
  [tenantResolve, autenticacao.authenticate()],
  ConsultaController.listar
);
rotas.get(
  "/consulta/:dtInicio/:dtFim",
  [tenantResolve],
  ConsultaController.listarPorData
);
rotas.get(
  "/consulta/:dtInicio/:dtFim/statusConsulta",
  [tenantResolve],
  ConsultaController.listaPorStatusConsulta
);
//Prontuario
rotas.post(
  "/prontuario",
  [
    planoResolve,
    tenantResolve,
    photoUpload.array("file", 3),
    autenticacao.authenticate()
  ],
  ProntuarioController.salvar
);
rotas.put(
  "/prontuario",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  ProntuarioController.editar
);
rotas.delete(
  "/prontuario/:id",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  ProntuarioController.deletar
);
rotas.get(
  "/prontuario",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  ProntuarioController.listar
);
rotas.get(
  "/prontuario/:pacienteId",
  [tenantResolve, autenticacao.authenticate()],
  ProntuarioController.findAllForPaciente
);

//Movimentacao financeira
rotas.post(
  "/movimentacao-financeira",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  MovimentacaoFinanceiraController.salvar
);
rotas.put(
  "/movimentacao-financeira",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  MovimentacaoFinanceiraController.editar
);
rotas.delete(
  "/movimentacao-financeira",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  MovimentacaoFinanceiraController.deletar
);
rotas.get(
  "/movimentacao-financeira",
  [tenantResolve, autenticacao.authenticate()],
  MovimentacaoFinanceiraController.listar
);

//Prontuario_anexo
rotas.delete(
  "/prontuario-anexo",
  [planoResolve, tenantResolve, autenticacao.authenticate()],
  ProntuarioAnexoController.deletar
);

//enum
rotas.get("/enum", enumController.listaEnums);

module.exports = rotas;
