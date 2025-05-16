const { AppError } = require("../shared/errors")
const devolverLivroUseCase = require("./devolver-livro.usecase")


describe("Devolver livro UseCase", () => {

    const emprestimosRepository = {
        devolver: jest.fn()
    }
    test("Deve ser possivel devolver um livro sem multa", async () => 
    {
        emprestimosRepository.devolver.mockResolvedValue({
            return_date: new Date('2025-05-16'),
        })
        const devolverlivroDTO = {
            emprestimoid: "qualquer id",
            data_devolucao: new Date('2025-05-16')
        }
        const sut = devolverLivroUseCase({emprestimosRepository})
        const output = await sut(devolverlivroDTO)
        expect(output.right).toBe("Multa por atraso: € 0")
        expect(emprestimosRepository.devolver).toHaveBeenCalledWith(devolverlivroDTO)
        expect(emprestimosRepository.devolver).toHaveBeenCalledTimes(1);
    })

    test("Deve ser possível devolver um livro com multa", async function () {
        emprestimosRepository.devolver.mockResolvedValue({
            return_date: new Date('2025-05-15'),
        })
        const devolverlivroDTO = {
            emprestimoid: "qualquer id",
            data_devolucao: new Date('2025-05-16')
        }
        const sut = devolverLivroUseCase({emprestimosRepository})
        const output = await sut(devolverlivroDTO)
        expect(output.right).toBe("Multa por atraso: € 10")
        expect(emprestimosRepository.devolver).toHaveBeenCalledWith(devolverlivroDTO)
        expect(emprestimosRepository.devolver).toHaveBeenCalledTimes(1);
    })

    test("Deve retornow um AppError se o emprestimosRepository não for fornecido", () => {
        expect(() => devolverLivroUseCase({})).toThrow(AppError.dependencies);
    })

    test("Deve devolver um AppError se os campos obrigatórios nao forem fornecidos", async function () {
        await expect(() => devolverLivroUseCase({ emprestimosRepository })({})).rejects.toThrow(AppError.missingParams);
    })
})
