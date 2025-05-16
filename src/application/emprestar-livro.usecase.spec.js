const { Either, AppError } = require("../shared/errors");
const emprestarLivroUsecase = require("./emprestar-livro.usecase")

describe("Emprestar livro UseCase", () => {
    const emprestimosRepository = {
        emprestarLivro: jest.fn(),
        existeLivroISBNEmprestadoPendenteUtilizador: jest.fn(),
        buscarEmprestimoComLivroComIDUtilizador: jest.fn()
    }

    const emailService = {
        enviarEmail: jest.fn()
    }
    test("Deve emprestar um livro", async () => {

        emprestimosRepository.existeLivroISBNEmprestadoPendenteUtilizador.mockResolvedValue(false);
        emprestimosRepository.emprestarLivro.mockResolvedValue("qualquer_id");
        emprestimosRepository.buscarEmprestimoComLivroComIDUtilizador.mockResolvedValue({
            user: {
                nome: "qualquer nome utilizador",
                NIF: "qualquer NIF",
                email: "qualquer email"
            },
            book: {
                nome: "qualquer nome livro"
            }
        })
        const emprestarLivroDTO = {
            userid: "userid valido",
            bookid: "bookid valido",
            return_date: new Date('2025-05-15'),
            exit_date: new Date('2025-05-15')
        }

        const sut = emprestarLivroUsecase({emprestimosRepository, emailService})
        const output = await sut(emprestarLivroDTO)

        expect(output.right).toBeNull()
        expect(emprestimosRepository.emprestarLivro).toHaveBeenCalledWith(emprestarLivroDTO);
        expect(emprestimosRepository.emprestarLivro).toHaveBeenCalledTimes(1);
        expect(emailService.enviarEmail).toHaveBeenCalledWith({exit_date: emprestarLivroDTO.exit_date, return_date: emprestarLivroDTO.return_date, nome_utilizador: "qualquer nome utilizador", NIF: "qualquer NIF", email: "qualquer email", nome_livro: "qualquer nome livro"});
    })

    test ("Deve retornar um either.left se a data de retorno for menor que a data de saída", async function() {
        const emprestarLivroDTO = {
            userid: "userid valido",
            bookid: "bookid valido",
            return_date: new Date('2025-05-14'),
            exit_date: new Date('2025-05-15')
        }

        const sut = emprestarLivroUsecase({emprestimosRepository, emailService})
        const output = await sut(emprestarLivroDTO)
        console.log(output.left)
        expect(output.left).toEqual(Either.dataRetornoMenorQueDataSaida())
        expect(emprestimosRepository.emprestarLivro).not.toHaveBeenCalled();
    })

    test("Não deve permitir o emprestimo de um livro com o mesmo ISBN para o mesmo utilizador antes que o livro anterior tenha sido devolvido", async () => {
        emprestimosRepository.existeLivroISBNEmprestadoPendenteUtilizador.mockResolvedValue(true);
        const emprestarLivroDTO = {
            userid: "userid valido",
            bookid: "bookid valido",
            return_date: new Date('2025-05-15'),
            exit_date: new Date('2025-05-15')
        }

        const sut = emprestarLivroUsecase({emprestimosRepository, emailService})
        const output = await sut(emprestarLivroDTO)
        expect(output.left).toEqual(Either.livroJaEmprestadoPendenteUtilizador())
        expect(emprestimosRepository.existeLivroISBNEmprestadoPendenteUtilizador).toHaveBeenCalledWith({userid: emprestarLivroDTO.userid, bookid: emprestarLivroDTO.bookid});
        expect(emprestimosRepository.existeLivroISBNEmprestadoPendenteUtilizador).toHaveBeenCalledTimes(1);
    })
    test("Deve retornar um AppError se o repositorio nao for fornecido", () => {
        expect(() => emprestarLivroUsecase({})).toThrow(AppError.dependencies);
    })

    test("Deve devolver um AppError se os campos obrigatórios nao forem fornecidos", async function () {
        await expect(() => emprestarLivroUsecase({ emprestimosRepository, emailService })({})).rejects.toThrow(AppError.missingParams);
    })
})