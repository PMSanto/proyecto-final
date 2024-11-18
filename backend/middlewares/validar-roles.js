const esAdminRole = (req, res, next) => {
    if (req.usuario.rol !== 'admin') {
      return res.status(403).json({
        message: 'El usuario no tiene privilegios de administrador'
      });
    }
    next();
  };
  
  module.exports = { esAdminRole };
  