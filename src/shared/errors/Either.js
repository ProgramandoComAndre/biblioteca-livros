/**
 * @description Nao deve ser instanciada Usar Right ou Left
 */
module.exports = class Either {
    constructor(left, right) {
        this.left = left;
        this.right = right;
    }

    static left(left) {
        return new Either(left, null);
    }

    static right(right) {
        return new Either(null, right);
    }

    static valorJaRegistado(valor) {
        return { message: `${valor} ja registado` }
    }
}