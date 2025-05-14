function somar ({x, y}) {
    return x + y;
}

function subtrair ({x, y}) {
    return x - y;
}

function aplicarOperacao({numero, numero2, operacao}) {
    return operacao({x: numero, y: numero2});
}