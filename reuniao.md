## Reuniao

* Somos uma biblioteca pequena e gostaríamos de controlar a nossa entrada e daída de livros. Queremos registar o utilizador que realizará um empréstimo de um livro, registar os livros da nossa biblioteca e emprestar os livros para qualquer utilizador, além de procurar os registos de empréstimos.

## Dados

- Utilizador (nome completo, NIF, telefone, morada, email)
- Livro: [nome, quantidade, autor, genero, ISBN]
- Empréstimo: [user_id, bookid, return_date, devolucao_date, exit_date]

## Use Cases

[] Registar novo utilizador
[] - CPF ou email devem ser únicos

[] Procurar um cadastro por CPF
[] - Devolve utilizador ou vazio

[] Registar um novo livro
[] - ISBN deve ser único

[] Procurar um livro por nome ou ISBN
[] - Devolve os livros ou vazio.

[] Emprestar um livro ao utilizador
[] - A data de retorno não pode ser menor que a data de saída
[] - Um utilizador não pode estar com mais de um livro com o mesmo ISBN ao mesmo tempo
[] - Um utilizador pode estar com mais de um livro com ISBN diferentes ao mesmo tempo.
[] - Ao registar um empréstimo, será enviado um email automaticamente, informando o nome do livro, nome de utilizador, CPF, a data de saída, e a data de retorno

[] Devolver livro emprestado
[] - Caso o utilizador tenha atrasado, será gerada uma multa fixa de de 10€.

[] Mostrar todos os emprestimos pendentes, com o nome do livro, nome de utilizador, CPF, data de saída e data de retorno, Ordenados pela data de retorno mais antiga.

## Estruturas

* UserRepository
[] register: {nomeCompleto, NIF, telefone, morada, email}=> Promise <void>