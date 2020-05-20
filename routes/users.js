var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users");
const authRegister = require("../middlewares/authRegister");
const authLogin = require("../middlewares/authLogin");
const onlyLogs = require("../middlewares/onlyLogs");
const onlyUnlogs = require("../middlewares/onlyUnlogs");

// GET
// registracion
router.get("/registro", onlyUnlogs, usersController.create);
// renderiza el formulario de login
router.get("/ingresar", onlyUnlogs, usersController.logForm);
// renderiza el perfil del usuario
router.get("/perfil", onlyLogs, usersController.profile);

// POST
// guarda el nuevo usuario
router.post("/registro", authRegister, usersController.save);
// Ingresa al perfil
router.post("/ingresar", authLogin, usersController.login);

module.exports = router;
