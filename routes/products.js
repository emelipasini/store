const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const multer = require("multer");
const path = require("path");

// Configuracion para subida de archivos
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/img/products");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({ storage: storage });

// GET
// pagina principal
router.get("/", productsController.index);
// detalle del producto
router.get("/:id/detalle", productsController.detail);
// renderiza el formulario para crear un producto
router.get("/crear", productsController.create);
// renderiza el formulario para editar un producto
router.get("/:id/editar", productsController.edit);

// POST
// crea un producto
router.post("/crear", upload.any(), productsController.save);

// PUT
// modifica un producto
router.put("/:id/editar", productsController.update);

// DELETE
// elimina un producto
router.delete("/:id/eliminar", productsController.delete);

module.exports = router;
