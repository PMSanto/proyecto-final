const Usuario = require("../models/usuario");
const Role = require("../models/rol");

const emailValido = async (email = "") => {
  const existeEmail = await Usuario.findOne({ email });
  if (existeEmail) {
    throw new Error(`El email ${email} ya está registrado`);
  }
};

const rolValido = async (rol = "") => {
  const existeRol = await Role.findOne({ role: rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no está registrado en la base de datos`);
  }
};

const ConfirmoUsuarioId = async (id = "") => {
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id ${id} no existe`);
  }
};

module.exports = { emailValido, rolValido, ConfirmoUsuarioId };
