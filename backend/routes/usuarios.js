const { Router } = require("express");

const router = Router();

// Aquí puedes agregar rutas específicas para los usuarios si es necesario.
router.get("/", (req, res) => {
  res.json({
    message: "Ruta de usuarios",
  });
});

module.exports = router;
