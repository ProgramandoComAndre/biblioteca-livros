module.exports = function procurarUtilizadorPorNif ({ userRepository }) {
    if (!userRepository) throw new AppError(AppError.dependencies);
    return async function ({nif}) {
        if(!nif) throw new AppError(AppError.missingParams);
        const utilizador = await userRepository.procuraPorNIF(nif);
        return Either.right(utilizador);
    };
}