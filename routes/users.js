var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users");

// GET
// registracion
router.get("/crear", usersController.create);
// renderiza el formulario de login
router.get("/ingresar", usersController.logForm);
// renderiza el perfil del usuario
router.get("/perfil", usersController.profile);

// POST
// guarda el nuevo usuario
router.post("/crear", usersController.save);
// Ingresa al perfil
router.post("/ingresar", usersController.login);

module.exports = router;
