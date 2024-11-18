const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { login, register, logout } = require("../controllers/auth");

const router = Router();

// Ruta para el registro
    router.post(
        "/register",
        [
          check("nombre", "El nombre es obligatorio").notEmpty(),
          check("email", "El email no es válido").isEmail(),
          check(
            "password",
            "La contraseña debe tener al menos 6 caracteres, una mayúscula, un número y un símbolo especial"
          ).matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/),
          check("rol", "El rol debe ser 'user' o 'admin'").custom(
            (value) => value === "user" || value === "admin"
          ),
          validarCampos,
        ],
        register
      );

// Ruta para el login
router.post(
  "/login",
  [
    check("email", "El email no es válido").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
    validarCampos, // Middleware que revisa si hay errores de validación
  ],
  login // Controlador de login
);

// Ruta para cerrar sesión
router.post("/logout", logout);

module.exports = router;
