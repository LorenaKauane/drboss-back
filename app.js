require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const routes = require("./src/routes");
const app = express();
const path = require("path");
const passport = require("passport");
const autenticacao = require("./autenticacao")();
const models = require("./models");

const errorHandler = require("./src/middlewares/errorHandler");

app.use(passport.initialize());
app.use(passport.session());
app.use(autenticacao.initialize());

require("./config/passaport/passaport.js")(passport, models.Usuario);

global._srcImage = `${__dirname}/uploads`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/doctor-boss/api", routes);
app.use(errorHandler);
app.use(
  "/doctor-boss/api/uploads/paciente",
  express.static(path.join(__dirname, "/uploads/paciente"))
);
app.use(
  "/doctor-boss/api/uploads/prontuario",
  express.static(path.join(__dirname, "/uploads/prontuario"))
);
module.exports = app;
