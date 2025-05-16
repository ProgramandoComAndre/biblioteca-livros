const { AppError, Either } = require("../shared/errors")
const registarLivroUseCase = require("./registar-livro.usecase")



describe('Registando livro', () => {

    const bookRepository = {
        register: jest.fn(),
        existByISBN: jest.fn()
    }
    test('Deve registar um livro', async () => {
        const bookDTO = {
            nome: 'nome valido', 
            quantidade: "quantidade valida", 
            autor: "autor valido", 
            genero: "genero valido", 
            ISBN: "ISBN valido"
        }

        const sut = registarLivroUseCase({ bookRepository })
        const output = await sut(bookDTO)

        expect(output.right).toBeNull()
        expect(bookRepository.register).toHaveBeenCalledWith(bookDTO);
        expect(bookRepository.register).toHaveBeenCalledTimes(1);
    })

    test('Deve retornar um AppError se o repositorio nao for fornecido', () => {
        expect(() => registarLivroUseCase({})).toThrow(AppError.dependencies);
    })

    test("Deve devolver um AppError se os campos obrigatórios não forem fornecidos", async function () {
        await expect(() => registarLivroUseCase({ bookRepository })({})).rejects.toThrow(AppError.missingParams);
    })

    test("Deve devolver um Either.Left.valorJaRegistado se um ISBN ja existir", async function() {
        bookRepository.existByISBN.mockResolvedValue(true);
        const bookDTO = {
            nome: 'nome valido', 
            quantidade: "quantidade valida", 
            autor: "autor valido", 
            genero: "genero valido", 
            ISBN: "ISBN ja registado"
        }
        bookRepository.register.mockResolvedValue(true);
        const sut = registarLivroUseCase({ bookRepository })
        const output = await sut(bookDTO)

        expect(output.left).toEqual(Either.valorJaRegistado("ISBN"))
        expect(bookRepository.existByISBN).toHaveBeenCalledWith(bookDTO.ISBN);
        expect(bookRepository.existByISBN).toHaveBeenCalledTimes(1);

    })
})
