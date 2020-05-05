const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");

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
router.post("/crear", productsController.save);

// PUT
// modifica un producto
router.put("/:id/editar", productsController.update);

// DELETE
// elimina un producto
router.delete("/:id/eliminar", productsController.delete);

module.exports = router;
