let users = require("../data/users.json");
const fs = require("fs");
const bcrypt = require("bcrypt");
const { check, validationResult, body } = require("express-validator");

const userController = {
    create: function (req, res) {
        res.render("register");
    },
    save: function (req, res) {

        let errors = validationResult(req);
        if(errors.isEmpty()) {
            users.forEach(user => {
                if(user.email == req.body.email) {
                    errors.errors.push({ msg: "El usuario ya existe" })
                    res.render("register", { errors: errors.errors });
                }
            });
            let lastId = users[users.length - 1].id;
            let password = bcrypt.hashSync(req.body.password, 10);
    
            users.push(
                {
                    "id": lastId + 1,
                    "name": req.body.name,
                    "surname": req.body.surname,
                    "email": req.body.email,
                    "password": password
                    // "avatar": req.files[0].filename
                }
            );
            fs.writeFileSync("./data/users.json", JSON.stringify(users));
            res.redirect("/usuario/perfil");
        }
        else {
            return res.render("register", { errors: errors.errors, data: req.body });
        }

    },
    logForm: function (req, res) {
        res.render("login");
    },
    login: function (req, res) {

        let errors = validationResult(req);
        if(errors.isEmpty()) {
            users.forEach(user => {
                if(user.email == req.body.email) {
                    let validate = bcrypt.compareSync(req.body.password, user.password);
                    console.log(validate);
                    if(validate) {
                        res.redirect("/usuario/perfil");
                    }
                }
            });
            errors.errors.push({ msg : "Credenciales incorrectas" })
            res.render("login", { errors: errors.errors, data: req.body });
        }
        else {
            res.render("login", { errors: errors.errors, data: req.body });
        }
    },
    profile: function (req, res) {
        res.render("profile");
    }
}

module.exports = userController;