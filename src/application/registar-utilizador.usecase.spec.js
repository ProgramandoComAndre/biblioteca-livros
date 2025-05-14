const AppError = require('../shared/errors/AppError');
const registarUtilizadorUsecase = require('./resgistar-utilizador.usecase');

describe('Registar utilizador', function () {
  const userRepository = {
    register: jest.fn(),
    existNIF: jest.fn(),
  };
  test('Deve registar um utilizador', async function () {

    
    // Arrange
    const utilizadorDTO = {
      nomeCompleto: 'nome valido',
      NIF: 'NIF Valido',
      telefone: 'telefone valido',
      morada: 'morada valida',
      email: 'email valido',
    };

    // Act
    const sut = registarUtilizadorUsecase({ userRepository });
    const output = await sut(utilizadorDTO);

    //Assert
    expect(output).toBeUndefined();
    expect(userRepository.register).toHaveBeenCalledWith(utilizadorDTO);
    expect(userRepository.register).toHaveBeenCalledTimes(1);
  });

  test('Deve retornar um throw AppError se o repositorio nao for fornecido', function () {
    expect(() => registarUtilizadorUsecase({})).toThrow(AppError.dependencies);
  });

  test('Deve retornar um throw AppError se os campos obrigatórios não forem fornecidos', async function () {
    const sut = registarUtilizadorUsecase({ userRepository });
    await expect(() => sut({})).rejects.toThrow(AppError.missingParams);
    
  });

  test('Deve retornar um throw AppError se o NIF ja existir', async function () {
    userRepository.existNIF.mockResolvedValue(true);  
    const utilizadorDTO = {
        nomeCompleto: 'nome valido',
        NIF: 'NIF Existente',
        telefone: 'telefone valido',
        morada: 'morada valida',
        email: 'email valido',
      };

      const sut = registarUtilizadorUsecase({ userRepository });
      await expect(() => sut(utilizadorDTO)).rejects.toThrow(AppError.nifJaExiste);
    });
});
