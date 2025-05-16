const { AppError } = require("../shared/errors")
const procurarLivroPorNomeISBNUsecase = require("./procurar-livro-por-nome-isbn.usecase")
describe('Procurar livro por nome ou ISBN', () => {
    const bookRepository = {
            findByNameOrISBN: jest.fn()
        }
    test('Deve procurar um livro por nome ou ISBN', async () => {
        const filterDTO = {
            valor: "valor válido"
        }
        

        const livros = [{
            id: "qualquer_ID",
            nome: "livro valido",
            quantidade: "quantidade valida",
            autor: "autor valido",
            genero: "genero valido",
            ISBN: "isbn valido"
           },
           {
           id: "qualquer_ID2",
            nome: "livro valido",
            quantidade: "quantidade valida",
            autor: "autor valido",
            genero: "genero valido",
            ISBN: "isbn valido"
           }
        ]
        
        

        bookRepository.findByNameOrISBN.mockResolvedValue(livros)
        const sut = procurarLivroPorNomeISBNUsecase({ bookRepository })
        const output = await sut(filterDTO)
        expect(output.right).toEqual(livros);
        expect(output.right.length).toEqual(2);
        expect(bookRepository.findByNameOrISBN).toHaveBeenCalledWith(filterDTO.valor);
        expect(bookRepository.findByNameOrISBN).toHaveBeenCalledTimes(1);
    })
    test("Deve devolver um AppError se o repositorio nao for fornecido", () => {
        expect(() => procurarLivroPorNomeISBNUsecase({})).toThrow(AppError.dependencies);
    })
    
    test("Deve encontrar um livro só com um parametro fornecido", async () => {
        const filterDTO = {
            valor: "valor válido"
        }
        const livros = [{
            id: "qualquer_ID",
            nome: "livro valido",
            quantidade: "quantidade valida",
            autor: "autor valido",
            genero: "genero valido",
            ISBN: "isbn valido"
           }
        ]
        
        bookRepository.findByNameOrISBN.mockResolvedValue(livros)
        const sut = procurarLivroPorNomeISBNUsecase({ bookRepository })
        const output = await sut(filterDTO)
        expect(output.right).toEqual(livros);
        expect(output.right.length).toEqual(1);
        expect(bookRepository.findByNameOrISBN).toHaveBeenCalledWith(filterDTO.valor);
        expect(bookRepository.findByNameOrISBN).toHaveBeenCalledTimes(1);
    })

    test("Deve devolver uma lista vazia se não encontrar nenhum livro", async () => {
        const filterDTO = {
            valor: "valor válido"
        }
        const livros = []
        
        bookRepository.findByNameOrISBN.mockResolvedValue(livros)
        const sut = procurarLivroPorNomeISBNUsecase({ bookRepository })
        const output = await sut(filterDTO)
        expect(output.right).toEqual(livros);
        expect(output.right.length).toEqual(0);
        expect(bookRepository.findByNameOrISBN).toHaveBeenCalledWith(filterDTO.valor);
        expect(bookRepository.findByNameOrISBN).toHaveBeenCalledTimes(1);
    })

    test("Deve devolver um AppError se o nenhum parametro for fornecido", async () => {
        await expect(() => procurarLivroPorNomeISBNUsecase({ bookRepository })({})).rejects.toThrow(AppError.missingParams);
    })
})