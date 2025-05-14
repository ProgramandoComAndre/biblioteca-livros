const { Either } = require('../shared/errors');
const AppError = require('../shared/errors/AppError');
const registarUtilizadorUsecase = require('./resgistar-utilizador.usecase');

describe('Registar utilizador', function () {
  const userRepository = {
    register: jest.fn(),
    existNIF: jest.fn(),
    existEmail: jest.fn(),
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
    expect(output.right).toBeNull()
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
      const output = await sut(utilizadorDTO)
      expect(output.right).toBe(null);
      expect(output.left).toEqual(Either.valorJaRegistado(utilizadorDTO.NIF));
      expect(userRepository.existNIF).toHaveBeenCalledWith(utilizadorDTO.NIF);
      expect(userRepository.existNIF).toHaveBeenCalledTimes(1);
    });

    test('Deve retornar um throw AppError se o NIF ja existir', async function () {
        userRepository.existNIF.mockResolvedValue(false);
        userRepository.existEmail.mockResolvedValue(true);  
    const utilizadorDTO = {
        nomeCompleto: 'nome valido',
        NIF: 'NIF valido',
        telefone: 'telefone valido',
        morada: 'morada valida',
        email: 'email existente',
      };

      const sut = registarUtilizadorUsecase({ userRepository });
      const output = await sut(utilizadorDTO)
      expect(output.right).toBe(null);
      expect(output.left).toEqual(Either.valorJaRegistado(utilizadorDTO.email));
      expect(userRepository.existEmail).toHaveBeenCalledWith(utilizadorDTO.email);
      expect(userRepository.existEmail).toHaveBeenCalledTimes(1);
    });
});
