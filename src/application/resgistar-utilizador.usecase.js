module.exports = function registarUtilizadorUseCase({ userRepository }) {
  if (!userRepository) throw new Error('O UserRepository nao foi fornecido');
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
