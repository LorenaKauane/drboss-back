let passport = require('passport');

module.exports.validaLogin = (req, res) => {
	passport.authenticate('valida_login', (erro, usuario, info) => {
		if (erro) res.status(500).send('Internal Server Error');
		if (!usuario) res.status(401).send(info);
		if (usuario) {
			res.status(200).send(usuario);
			res.end();
		}
	})(req, res);
};

module.exports.criaConta = (req, res) => {
	passport.authenticate('cria_usuario_login', (erro, usuario, info) => {
		if (erro) res.status(500).send('Internal Server Error');
		if (!usuario) res.status(401).send(info);
		if (usuario) {
			res.status(200).send(usuario);
		}
	})(req, res);
};