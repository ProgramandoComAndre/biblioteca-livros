module.exports = function registarUtilizadorUseCase({userRepository}) {
    return async function ({nomeCompleto, NIF, telefone, morada, email}) {
        await userRepository.register({
            nomeCompleto,
            NIF,
            telefone,
            morada,
            email
        })
    }
}