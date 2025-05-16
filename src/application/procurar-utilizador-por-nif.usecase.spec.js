const { AppError } = require("../shared/errors")
const procurarUtilizadorNifUsecase = require("./procurar-utilizador-nif.usecase")
describe('Procurar utilizador por NIF', () => { 
    const userRepository = {
        procuraPorNIF: jest.fn(),
    }
    test("Deve retornar um utilizador caso o NIF esteja registado", async () => {
        
        const nifDTO = {
            nif: "NIF Registado"
        }

        const outputDTO = {
            id: "qualquer_ID",
            nome: "qualquer_nome",
            NIF : "NIF Registado",
            telefone: "qualquer_telefone",
            morada: "qualquer_morada",
            email: "qualquer_email"
        }

        userRepository.procuraPorNIF.mockResolvedValue(outputDTO)
        const sut = procurarUtilizadorNifUsecase({ userRepository })
        const output = await sut(nifDTO)
        expect(output.right).toEqual(outputDTO)
        expect(userRepository.procuraPorNIF).toHaveBeenCalledWith(nifDTO.nif);
        expect(userRepository.procuraPorNIF).toHaveBeenCalledTimes(1);
    })

    test("Deve devolver null se não existir nenhum utilizador com o NIF fornecido", async () => {
        const nifDTO = {
            nif: "NIF nao existente"
        }

        userRepository.procuraPorNIF.mockResolvedValue(null)
        const sut = procurarUtilizadorNifUsecase({ userRepository })
        const output = await sut(nifDTO)
        expect(output.right).toBeNull()
        expect(userRepository.procuraPorNIF).toHaveBeenCalledWith(nifDTO.nif);
        expect(userRepository.procuraPorNIF).toHaveBeenCalledTimes(1);
    })

    test ("Deve retornar um AppError se o repositorio nao for fornecido", () => {
        expect(() => procurarUtilizadorNifUsecase({})).toThrow(AppError.dependencies);
    })

    test ("Deve devolver um AppError se o NIF não for fornecido", async () => {
        const sut = procurarUtilizadorNifUsecase({ userRepository })
        await expect(() => sut({})).rejects.toThrow(AppError.missingParams);
})
})
