let products = require("../data/productsDataBase.json");
const fs = require("fs");

const productController = {
    // Funciones de rutas
    index: function (req, res) {
        res.render("index", { allProducts: products, toThousands: productController.toThousands });
    },
    detail: function (req, res) {
        let productId = req.params.id;
        let product = productController.product(productId);
        res.render("detail", { product: product, toThousands: productController.toThousands });
    },
    create: function (req, res) {
        res.render("product-create-form");
    },
    save: function (req, res) {
        // esto guarda el producto en la db
        let lastId = products[products.length - 1].id;
        products.push(
            {
                "id": lastId + 1,
                "name": req.body.name,
                "price": req.body.price,
                "discount": req.body.discount,
                "description": req.body.description
            }
        );
        fs.writeFileSync("./data/productsDataBase.json", JSON.stringify(products));
        res.redirect("/producto/" + (lastId + 1) + "/detalle");
    },
    edit: function (req, res) {
        let productId = req.params.id;
        let product = productController.product(productId);
        res.render("product-edit-form", { product: product });
    },
    update: function (req, res, next) {
        // esto edita el producto en la db
        let id = req.params.id;
        products.forEach(product => {
            if (product.id == id) {
                product.name = req.body.name;
                product.price = parseInt(req.body.price);
                product.discount = parseInt(req.body.discount);
                product.description = req.body.description;
            }
        });
        fs.writeFileSync("./data/productsDataBase.json", JSON.stringify(products));
        res.redirect("/producto/" + id + "/detalle");
    },
    delete: function (req, res) {
        // esto elimina el producto de la db
        let id = req.params.id;
        products = products.filter((product) => product.id != id);
        fs.writeFileSync("./data/productsDataBase.json", JSON.stringify(products));
        res.redirect("/");
    },
    // Funciones que traen productos
    product: function (productId) {
        let finalProduct = "El producto no existe!";
        products.forEach(product => {
            if (product.id == productId) {
                finalProduct = product;
            }
        });
        return finalProduct;
    },
    // Otras funciones
    toThousands: function (n) {
        return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
}

module.exports = productController;