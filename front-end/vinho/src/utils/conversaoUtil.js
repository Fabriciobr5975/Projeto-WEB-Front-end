
export function tratarNumeroComVirgula(valor) {
    return Number(String(valor).trim().replaceAll(',', '.'));
}

export function imprimirNumeroComVirgula(valor) {
    return String(valor).replaceAll('.', ',');
}