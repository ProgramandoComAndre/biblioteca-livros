const AppError = require("../shared/errors/AppError");

module.exports = function registarUtilizadorUseCase({ userRepository }) {
  if (!userRepository) throw new AppError(AppError.dependencies);
  return async function ({ nomeCompleto, NIF, telefone, morada, email }) {
    await userRepository.register({
      nomeCompleto,
      NIF,
      telefone,
      morada,
      email,
    });
  };
};
