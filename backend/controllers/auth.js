const express = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');

// Login de usuario
const login = async (req, res) => { // No es necesario destructurar request y response
  const { email, password } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(400).json({
        message: "Usuario o contraseña incorrectos",
      });
    }

    const validPassword = await bcrypt.compare(password, usuario.password);
    if (!validPassword) {
      return res.status(400).json({
        message: "Usuario o contraseña incorrectos",
      });
    }

    const token = jwt.sign(
      { uid: usuario._id, rol: usuario.rol },
      process.env.PRIVATESECRETKEY,
      { expiresIn: "4h" }
    );

    res.json({
      message: "Login exitoso",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error interno en el servidor",
      error: error.message,
    });
  }
};

// Registro de usuario
const register = async (req, res) => {
  const { nombre, email, password, rol } = req.body;

  try {
    const existingUser = await Usuario.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "El correo ya está registrado",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const usuario = new Usuario({
      nombre,
      email,
      password: hashedPassword,
      rol,
    });

    await usuario.save();
    res.status(201).json({
      message: "Usuario creado con éxito",
      usuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error al crear el usuario",
      error: error.message,
    });
  }
};

module.exports = { login, register };
