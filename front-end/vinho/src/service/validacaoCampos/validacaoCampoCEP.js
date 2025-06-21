
export default function validarCEP(cep) {
    const cepLimpo = cep.replace(/[-]/g, '');

    if (!/^\d{8}$/.test(cepLimpo)) {
        return false;
    }

    const regexCepFormatado = /^\d{5}-\d{3}$/;
    const regexCepSemFormatacao = /^\d{8}$/;

    return regexCepFormatado.test(cep) || regexCepSemFormatacao.test(cep);
}