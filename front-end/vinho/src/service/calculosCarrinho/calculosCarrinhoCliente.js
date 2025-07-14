/* ------ DEPRECIADO, NÃO TEM MAIS UTILIDADE ------ */

export function calcularValorTotalCarrinho(itensCarrinho) {
    const precoTotal = itensCarrinho.reduce((valor, item) => {
        return valor + Number(item.preco_vinho) * item.quantidade;
    }, 0);

    return precoTotal;
}

export function calcularTicketMedioCliente(valorTotal, quantidade) {
    return valorTotal / quantidade;
}