const AppError = require("../shared/errors/AppError");

module.exports = function registarUtilizadorUseCase({ userRepository }) {
  if (!userRepository) throw new AppError(AppError.dependencies);
  return async function ({ nomeCompleto, NIF, telefone, morada, email }) {
    const checaCampos = nomeCompleto && NIF && telefone && morada && email;
    if(!checaCampos) throw new AppError(AppError.missingParams);
    await userRepository.register({
      nomeCompleto,
      NIF,
      telefone,
      morada,
      email,
    });
  };
};
