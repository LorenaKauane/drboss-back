let express = require("express");
let rotas = express.Router();
const multer = require("multer");
const tenantResolve = require("../middlewares/tenantResolve");
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
rotas.get(
  "/usuario",
  [tenantResolve, autenticacao.authenticate()],
  UsuarioController.listar
);

//Paciente
rotas.post(
  "/paciente",
  [tenantResolve, photoUpload.single("file")],
  PacienteController.salvar
);
rotas.put(
  "/paciente",
  [tenantResolve, photoUpload.single("file")],
  PacienteController.editar
);
rotas.delete(
  "/paciente/:id",
  [tenantResolve, autenticacao.authenticate()],
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
  [tenantResolve, autenticacao.authenticate()],
  ServicoController.salvar
);
rotas.put(
  "/servico",
  [tenantResolve, autenticacao.authenticate()],
  ServicoController.editar
);
rotas.delete(
  "/servico/:id",
  [tenantResolve, autenticacao.authenticate()],
  ServicoController.deletar
);
rotas.get(
  "/servico",
  [tenantResolve, autenticacao.authenticate()],
  ServicoController.listar
);

//Consulta
rotas.post("/consulta", [tenantResolve], ConsultaController.salvar);
rotas.put(
  "/consulta",
  [tenantResolve, autenticacao.authenticate()],
  ConsultaController.editar
);
rotas.delete(
  "/consulta",
  [tenantResolve, autenticacao.authenticate()],
  ConsultaController.deletar
);
rotas.get("/consulta", [tenantResolve], ConsultaController.listar);
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
  [tenantResolve, photoUpload.array("file", 3)],
  ProntuarioController.salvar
);
rotas.put(
  "/prontuario",
  [tenantResolve, autenticacao.authenticate()],
  ProntuarioController.editar
);
rotas.delete(
  "/prontuario/:id",
  [tenantResolve, autenticacao.authenticate()],
  ProntuarioController.deletar
);
rotas.get(
  "/prontuario",
  [tenantResolve, autenticacao.authenticate()],
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
  [tenantResolve, autenticacao.authenticate()],
  MovimentacaoFinanceiraController.salvar
);
rotas.put(
  "/movimentacao-financeira",
  [tenantResolve, autenticacao.authenticate()],
  MovimentacaoFinanceiraController.editar
);
rotas.delete(
  "/movimentacao-financeira",
  [tenantResolve, autenticacao.authenticate()],
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
  [tenantResolve, autenticacao.authenticate()],
  ProntuarioAnexoController.deletar
);

//enum
rotas.get("/enum", enumController.listaEnums);

module.exports = rotas;
