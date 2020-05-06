let users = require("../data/users.json");
const fs = require("fs");
const bcrypt = require("bcrypt");

const userController = {
    create: function (req, res) {
        res.render("register");
    },
    save: function (req, res) {
        users.forEach(user => {
            if(user.email == req.body.email) {
                res.send("El usuario ya existe.");
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
    },
    logForm: function (req, res) {
        res.render("login");
    },
    login: function (req, res) {
        users.forEach(user => {
            if(user.email == req.body.email) {
                let validate = bcrypt.compareSync(req.body.password, user.password);
                console.log(validate);
                if(validate) {
                    res.redirect("/usuario/perfil");
                }
                else {
                    res.send("Los datos no son correctos.");
                }
            }
        });
        res.send("Los datos no son correctos,");
    },
    profile: function (req, res) {
        res.render("profile");
    }
}

module.exports = userController;