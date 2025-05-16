const { AppError, Either } = require("../shared/errors");

module.exports = function registarLivroUseCase ({ bookRepository }) {
    if (!bookRepository) throw new AppError(AppError.dependencies);
    return async function ({nome, quantidade, autor, genero, ISBN}) {
        if(!nome || !quantidade || !autor || !genero || !ISBN) throw new AppError(AppError.missingParams);
        const checaSeJaExisteUmLivroComISBN = await bookRepository.existByISBN(ISBN);
        if(checaSeJaExisteUmLivroComISBN) return Either.left(Either.valorJaRegistado("ISBN"));
        await bookRepository.register({nome, quantidade, autor, genero, ISBN});
        return Either.right(null);
    }
}