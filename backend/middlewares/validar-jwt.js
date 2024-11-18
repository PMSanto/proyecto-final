const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  const token = req.header('x-token');
  if (!token) {
    return res.status(401).json({
      message: 'No hay token en la solicitud'
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.PRIVATESECRETKEY);
    req.uid = uid;  // Guardamos el id del usuario en la solicitud
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Token no válido'
    });
  }
};

module.exports = { validarJWT };
