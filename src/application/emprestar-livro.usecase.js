const { AppError, Either } = require("../shared/errors");

module.exports = function emprestarLivroUseCase({ emprestimosRepository, emailService}) {
    if(!emprestimosRepository || !emailService) throw new AppError(AppError.dependencies);
    return async function({userid, bookid, return_date,exit_date}) {
        if(!userid || !bookid || !return_date || !exit_date) throw new AppError(AppError.missingParams);
        console.log(exit_date.getTime() > return_date.getTime())
        if(exit_date.getTime() > return_date.getTime()) return Either.left(Either.dataRetornoMenorQueDataSaida());
        
        const existeLivroISBNEmprestadoPendenteUtilizador = await emprestimosRepository.existeLivroISBNEmprestadoPendenteUtilizador({userid, bookid});
    
        if(existeLivroISBNEmprestadoPendenteUtilizador) return Either.left(Either.livroJaEmprestadoPendenteUtilizador());
        const id = await emprestimosRepository.emprestarLivro({userid, bookid, return_date, exit_date});
        
        const {user, book } = await emprestimosRepository.buscarEmprestimoComLivroComIDUtilizador(id);

        await emailService.enviarEmail({exit_date, return_date, nome_utilizador: user.nome, NIF: user.NIF, email: user.email, nome_livro: book.nome});
        return Either.right(null);
    }
}