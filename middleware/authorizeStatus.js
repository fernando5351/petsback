function checkStatusMiddleware(req, res, next) {
  let active = true;

  if (req.user && req.user.status === active) {
    next();
  } else {
    res.status(403).json({ error: "Usuario inactivo" });
  }
}

module.exports = checkStatusMiddleware;
