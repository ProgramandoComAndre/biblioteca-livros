function calcularTotalPedido(precoUnitario, quantidade) {
  return precoUnitario * quantidade;
}

function calcularTotal({ precoUnitario, quantidade }) {
  return precoUnitario * quantidade;
}

const totalPedido2 = calcularTotal({ precoUnitario: 10, quantidade: 2 });

const pedidoDTO = {
  precoUnitario: 20,
  quantidade: 3,
};

const totalPedido3 = calcularTotal(pedidoDTO);
