const { AppError } = require("../shared/errors")
const buscarEmprestimosUsecase = require("./buscar-emprestimos.usecase")

describe('Buscar emprestimos pendentes UseCase', () => { 
   const emprestimosRepository = {
       buscarPendentesComLivroComUtilizador: jest.fn()
   }
   test("Deve ser possível buscar os empréstimos pendentes", async function () {

    emprestimosRepository.buscarPendentesComLivroComUtilizador.mockResolvedValue([
        {
            user: {
                nome: "qualquer_nome_utilizador",
                NIF: "qualquer_NIF"
            },
            livro: {
                nome: "qualquer_nome_livro"
            },
            exit_date: '2024-10-01',
            return_date: '2024-10-02'
        },
        {
            user: {
                nome: "qualquer_nome_utilizador_valido",
                NIF: "qualquer_NIF_valido"
            },
            livro: {
                nome: "qualquer_nome_livro_valido"
            },
            exit_date: '2024-11-10',
            return_date: '2024-10-15'   
        }
    ])
    const sut = buscarEmprestimosUsecase({emprestimosRepository})
    const output = await sut()
    expect(output.right).toHaveLength(2)
    expect(output.right[0].user.nome).toBe("qualquer_nome_utilizador")
    expect(output.right[0].livro.nome).toBe("qualquer_nome_livro")
    expect(output.right[0].exit_date).toBe('2024-10-01')
    expect(output.right[0].return_date).toBe('2024-10-02')
    expect(output.right[1].user.nome).toBe("qualquer_nome_utilizador_valido")
    expect(output.right[1].livro.nome).toBe("qualquer_nome_livro_valido")
    expect(output.right[1].exit_date).toBe('2024-11-10')
    expect(output.right[1].return_date).toBe('2024-10-15')

    expect(emprestimosRepository.buscarPendentesComLivroComUtilizador).toHaveBeenCalledTimes(1);
    expect(emprestimosRepository.buscarPendentesComLivroComUtilizador).toHaveBeenCalledWith();
})
    test("Deve retornar um AppError se o emprestimosRepository nao for fornecido", () => {
        expect(() => buscarEmprestimosUsecase({})).toThrow(AppError.dependencies);
    })
})