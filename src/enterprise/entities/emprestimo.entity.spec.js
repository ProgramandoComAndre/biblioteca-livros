const { AppError } = require("../../shared/errors")
const { calcularMulta } = require("./emprestimo.entity")

describe("Emprestimos entity", () => {
    test("Calcular multa sem atraso", () => {
        const resultado = calcularMulta({return_date: '2025-05-16', data_devolucao: '2025-05-16'})
        expect(resultado).toBe("Multa por atraso: € 0")     
    })

    test("Calcular multa com atraso", () => {
        const resultado = calcularMulta({return_date: '2025-05-15', data_devolucao: '2025-05-16'})
        expect(resultado).toBe("Multa por atraso: € 10")     
    })

    test("calcularMulta - deve retornar um AppError se campos os obrigatórios não foram fornecidos", () => {
        expect(() => calcularMulta({})).toThrow(AppError.missingParams);
    })
})