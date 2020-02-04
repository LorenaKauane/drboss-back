const passport = require("passport");
const { Strategy, ExtractJwt } = require("passport-jwt");
const usuarioRepository =require("./src/repository/usuarioRepository");
const cfg = require("./config/config");
const params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

module.exports =   function   () {
  const strategy = new Strategy(params,async function  (payload, done) {
    const usuario = await usuarioRepository.findById(payload.id);

    if (usuario) {
      return done(null, {id: usuario.id});
    } else {
      return done(new Error("User not found"), null);
    }
  });
  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};