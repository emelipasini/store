var express = require('express');
var router = express.Router();
const usersController = require("../controllers/users");
const { check, validationResult, body } = require("express-validator");

// GET
// registracion
router.get("/registro", usersController.create);
// renderiza el formulario de login
router.get("/ingresar", usersController.logForm);
// renderiza el perfil del usuario
router.get("/perfil", usersController.profile);

// POST

// guarda el nuevo usuario
router.post("/registro", [
    check("name").trim().isLength({ min: 3 }).withMessage("El nombre es obligatorio")
    .isAlpha().withMessage("El nombre no puede contener números"),

    check("surname").trim().isLength({ min: 3 }).withMessage("El apellido es obligatorio")
    .isAlpha().withMessage("El apellido no puede contener números"),

    check("email").trim().isEmail().withMessage("El correo no es válido"),

    check("password").trim().isLength({ min: 8 }).withMessage("La contraseña debe contener al menos 8 caracteres")
    .isAlphanumeric().withMessage("La contraseña debe contener letras y números"),
    
    check("r-pass", "Las contraseñas no coinciden").trim().custom((value, { req }) => (value === req.body.password))

], usersController.save);

// Ingresa al perfil
router.post("/ingresar", [
    check("email").trim().isEmail().withMessage("El correo no es válido"),
    check("password").trim().isLength().withMessage("La contraseña es obligatoria")
], usersController.login);

module.exports = router;
