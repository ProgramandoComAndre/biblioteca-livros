const { Either, AppError } = require("../shared/errors");

module.exports = function buscarEmprestimosPendentesUseCase({emprestimosRepository}) {
    if(!emprestimosRepository) throw new AppError(AppError.dependencies);
    return async function () {
        const emprestimos = await emprestimosRepository.buscarPendentesComLivroComUtilizador();
        return Either.right(emprestimos);
    }
}