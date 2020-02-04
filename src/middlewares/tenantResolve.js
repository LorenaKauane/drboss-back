module.exports = (req, res, next) => {
  const tenantId = req.headers.tenantid;

  if (!tenantId) {
    throw new Error("Ops aconteceu alguma coisa.");
  } else {
    req.body.tenantId = tenantId;
    next();
  }
};
