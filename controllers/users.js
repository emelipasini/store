let users = require("../data/users.json");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const userController = {
    create: function (req, res) {
        res.render("register");
    },
    save: function (req, res) {
        // Guarda el nuevo usuario en la db

        // Trae los errores
        let errors = validationResult(req);

        // Controla que el correo no se repita
        users.forEach(user => {
            if(user.email == req.body.email) {
                errors.errors.push({ msg: "El usuario ya existe" })
            }
        });

        if(errors.isEmpty()) {
            // Obtiene el id y hashea contraseña
            let lastId = users[users.length - 1].id;
            let password = bcrypt.hashSync(req.body.password, 10);
            // Guarda el usuario
            let user = {
                "id": lastId + 1,
                "name": req.body.name,
                "surname": req.body.surname,
                "email": req.body.email,
                "password": password
                // Para despues
                // "avatar": req.files[0].filename
            }
            users.push(user);
            fs.writeFileSync("./data/users.json", JSON.stringify(users));
            userLog = {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email
            }
            req.session.userLog = userLog;
            res.redirect("/usuario/perfil");
        }
        else {
            // Vuelve a cargar el registro con los errores
            return res.render("register", { errors: errors.errors, data: req.body });
        }

    },
    logForm: function (req, res) {
        res.render("login");
    },
    login: function (req, res) {
        // Loguea al usuario
        let errors = validationResult(req);
        if(errors.isEmpty()) {
            // Se fija que las credenciales sean correctas
            users.forEach(user => {
                if(user.email == req.body.email) {
                    let validate = bcrypt.compareSync(req.body.password, user.password);

                    if(validate) {
                        userLog = {
                            id: user.id,
                            name: user.name,
                            surname: user.surname,
                            email: user.email
                        }
                        req.session.userLog = userLog;
                    }
                }
            });
            if (req.session.userLog) {
                if (req.body.remember) {
                    console.log("recuerdame");
                    let id = req.session.userLog.id;
                    res.cookie("remember", id, { maxAge: 10000, httpOnly: false });
                }
                res.redirect("/usuario/perfil");
            }
            else {
                // Vuelve a cargar el login con los errores
                errors.errors.push({ msg : "Credenciales incorrectas" })
                res.render("login", { errors: errors.errors, data: req.body });
            }
        }
        else {
            // Vuelve a cargar el login con los errores
            res.render("login", { errors: errors.errors, data: req.body });
        }
    },
    profile: function (req, res) {
        res.render("profile", { user: req.session.userLog });
    }
}

module.exports = userController;