const { Either, AppError } = require("../shared/errors");
module.exports = function procuraLivroPorNomeOuISBN ({ bookRepository }) {
    if (!bookRepository) throw new AppError(AppError.dependencies);
    return async function ({valor}) {
        if(!valor) throw new AppError(AppError.missingParams);
        const book = await bookRepository.findByNameOrISBN(valor);
        return Either.right(book);
    };
}