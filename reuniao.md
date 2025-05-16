## Reuniao

* Somos uma biblioteca pequena e gostaríamos de controlar a nossa entrada e daída de livros. Queremos registar o utilizador que realizará um empréstimo de um livro, registar os livros da nossa biblioteca e emprestar os livros para qualquer utilizador, além de procurar os registos de empréstimos.

## Dados

- Utilizador (nome completo, NIF, telefone, morada, email)
- Livro: [nome, quantidade, autor, genero, ISBN]
- Empréstimo: [user_id, bookid, return_date, devolucao_date, exit_date]

## Use Cases

[X] Registar novo utilizador
[X] - CPF ou email devem ser únicos

[X] Procurar um cadastro por CPF
[X] - Devolve utilizador ou vazio

[x] Registar um novo livro
[X] - ISBN deve ser único

[X] Procurar um livro por nome ou ISBN
[X] - Devolve os livros ou vazio.

[X] Emprestar um livro ao utilizador
[X] - A data de retorno não pode ser menor que a data de saída
[X] - Um utilizador não pode estar com mais de um livro com o mesmo ISBN ao mesmo tempo
[X] - Um utilizador pode estar com mais de um livro com ISBN diferentes ao mesmo tempo.
[X] - Ao registar um empréstimo, será enviado um email automaticamente, informando o nome do livro, nome de utilizador, CPF, a data de saída, e a data de retorno

[X] Devolver livro emprestado sem multa
[X] - Caso o utilizador tenha atrasado, será gerada uma multa fixa de de 10€.

[X] Mostrar todos os emprestimos pendentes, com o nome do livro, nome de utilizador, CPF, data de saída e data de retorno, Ordenados pela data de retorno mais antiga.

## Estruturas

* UserRepository
[] register: {nomeCompleto, NIF, telefone, morada, email}=> Promise <void>
[] existNIF(NIF) => Promise<boolean>
[] existEmail(email) => Promise<boolean>

* BookRepository

[] register ({nome, quantidade, autor, genero, ISBN}) => Promise<void>
[] existByISBN(ISBN) => Promise<boolean>
[] findByNameOrISBN(valor) => Promise<Array<Livro>>

* Emprestimos Repository

[] emprestarLivro { bookid, userid, exit_date, return_date } => Promise<void>
[] existeLivroISBNEmprestadoPendenteUtilizador() => Promise<boolean>
[] buscarEmprestimoComLivroComIDUtilizador (id) => Promise<Emprestimo & {book, user}>
[] devolver ({emprestimoid, data_devolucao}) => Promise<{return_date}>
[] buscarPendentesComLivroComUtilizador: () => Promise<Emprestimo: {return_date, exit_date & Livro: {nome}, User:{nome_completo, NIF}}>