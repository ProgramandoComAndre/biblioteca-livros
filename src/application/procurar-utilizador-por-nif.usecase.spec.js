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

    
})
