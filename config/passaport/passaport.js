const usuarioRepository = require("../../src/repository/usuarioRepository");
const bcrypt = require("bcrypt");
const jwt = require("jwt-simple");
const config = require("../configJWT");

module.exports = function(passport) {
  let LocalStrategy = require("passport-local").Strategy;

  passport.use(
    "cria_usuario_login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "senha",
        passReqToCallback: true
      },
      (req, email, senha, done) => {
        usuarioRepository.findByEmail(email).then(usuario => {
          if (usuario) {
            return done(null, false, "Email já está sendo utilizado");
          } else {
            usuarioRepository
              .create(req.body)
              .then(novoUsuario => {
                if (!novoUsuario) return done(null, false);
                if (novoUsuario) return done(null, novoUsuario);
              })
              .catch(err => {
                return done(
                  null,
                  false,
                  "Ops...Algo de errado com o seu login" + err.message
                );
              });
          }
        });
      }
    )
  );

  //LOCAL SIGNIN
  passport.use(
    "valida_login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "senha",
        passReqToCallback: true
      },
      (_req, email, senha, done) => {
        usuarioRepository
          .findByEmail(email)
          .then(usuario => {
            if (!usuario) return done(null, false, "Email ou senha incorretos");
            if (bcrypt.compareSync(senha, usuario.senha)) {
              const payload = { id: usuario.id };
              const token = jwt.encode(payload, config.jwtSecret);
              const response = {
                token,
                tenantId: usuario.tenantId,
                usuario: usuario.nome,
                usuario: usuario
              };
              return done(null, response);
            } else {
              return done(null, false, "Email ou senha incorretos");
            }
          })
          .catch(() => {
            return done(null, false, "Ops...Algo de errado com o seu login");
          });
      }
    )
  );
};
