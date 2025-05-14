module.exports = class AppError extends Error {
    constructor(message) {
        super(message)
        this.message = message
    }

    static dependencies = "Alguma dependencia obrigatoria nao foi fornecida"
    static missingParams = "Algum dos parametros obrigatorios nao foi fornecido"
    static nifJaExiste = "NIF ja existe"
}