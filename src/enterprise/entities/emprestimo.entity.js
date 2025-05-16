const { AppError } = require("../../shared/errors")

const emprestimosEntity = function () {

    function calcularDiasAtraso ({return_date, data_devolucao}) {
        return new Date(return_date).getTime() < new Date(data_devolucao).getTime()
    }
    const calcularMulta = function ({return_date, data_devolucao}) {
        if(!return_date || !data_devolucao) throw new AppError(AppError.missingParams);
        const diasAtraso = calcularDiasAtraso({return_date, data_devolucao})
        return 'Multa por atraso: € ' + (diasAtraso? '10' : '0')
    }

    return {
        calcularMulta
    }
}

module.exports = emprestimosEntity()