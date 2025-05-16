const emprestimoEntity = require("../enterprise/entities/emprestimo.entity");
const { Either, AppError } = require("../shared/errors")

module.exports = function devolverLivroUseCase ({emprestimosRepository}) {
    if(!emprestimosRepository) throw new AppError(AppError.dependencies);
    return async function ({emprestimoid, data_devolucao}) {
       if(!emprestimoid || !data_devolucao) throw new AppError(AppError.missingParams);
       const {return_date} = await emprestimosRepository.devolver({emprestimoid, data_devolucao}) 
    
       const calcularMulta = emprestimoEntity.calcularMulta({return_date, data_devolucao})
       return Either.right(calcularMulta)
    }
}