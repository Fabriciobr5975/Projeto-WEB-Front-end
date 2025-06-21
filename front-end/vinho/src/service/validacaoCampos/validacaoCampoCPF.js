
export default function validarCPF(cpf) {
    const cpfLimpo = cpf.replace(/[.-]/g, '');

    if (!/^\d{11}$/.test(cpfLimpo)) {
        return false;
    }

    const regexCpfFormatado = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const regexCpfSemFormatacao = /^\d{11}$/;

    return regexCpfFormatado.test(cpf) || regexCpfSemFormatacao.test(cpf);
}