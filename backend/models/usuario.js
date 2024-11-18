const { Schema, model } = require("mongoose");

const UsuarioSchema = Schema(
  {
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
    },
    email: {
      type: String,
      required: [true, "El correo es obligatorio"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
    rol: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { collection: "usuarios" }
);

// Método para ocultar el password en las respuestas
UsuarioSchema.methods.toJSON = function () {
  const { __v, password, ...usuario } = this.toObject();
  return usuario;
};

module.exports = model("Usuario", UsuarioSchema);
