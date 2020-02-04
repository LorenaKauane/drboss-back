module.exports = (err, req, res, next) => {
  const { message, status } = err;
  res
    .status(status || 500)
    .send({ message } || { message: "Ops aconteceu alguma coisa..." });
};
