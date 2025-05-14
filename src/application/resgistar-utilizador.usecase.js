const { Either } = require("../shared/errors");
const AppError = require("../shared/errors/AppError");

module.exports = function registarUtilizadorUseCase({ userRepository }) {
  if (!userRepository) throw new AppError(AppError.dependencies);
  return async function ({ nomeCompleto, NIF, telefone, morada, email }) {
    const checaCampos = nomeCompleto && NIF && telefone && morada && email;
    if(!checaCampos) throw new AppError(AppError.missingParams);
    const checaSeExisteUtilizadorComNif = await userRepository.existNIF(NIF);
    if(checaSeExisteUtilizadorComNif) return Either.left(Either.valorJaRegistado(NIF));
    const checaSeEmailExiste = await userRepository.existEmail(email);
    if(checaSeEmailExiste) return Either.left(Either.valorJaRegistado(email));
    await userRepository.register({
      nomeCompleto,
      NIF,
      telefone,
      morada,
      email,
    });
    return Either.right(null);
  };
};
