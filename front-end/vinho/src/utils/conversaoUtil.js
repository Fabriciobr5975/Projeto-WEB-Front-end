
/**
 * Função que pega um número com vírgula e trocar para o ponto. Isso é feito com valores com a parte fracionada
 * 
 * @param {Number} valor - Recebe o número que será tratado
 * 
 * @returns Retorna o número a vírgula trocada pelo ponto
 */
export function tratarNumeroComVirgula(valor) {
  return Number(String(valor).trim().replaceAll(',', '.'));
}

/**
 * Função para imprimir os valores com a vírgula, trocando de ponto para vírgula
 * 
 * @param {Number} valor - Recebe o número que será tratado
 * 
 * @returns Retorna uma String contendo o valor com a parte fracionada com a vírgula
 */
export function imprimirNumeroComVirgula(valor) {
  return String(valor).replaceAll('.', ',');
}

/**
 * Função para transformar uma imagem em base64 em um file
 * 
 * @param {Base64URLString} base64 - Recebe a imagem em base64
 * @param {String} fileName - Recebe o nome da imagem
 * 
 * @returns Retorna um novo File, contendo um array com a imagem, o nome da imagem e o seu tipo (MIME)
 */
export function base64ParaFile(base64, fileName) {
  const arr = base64.split(',');
  const mimeMatch = arr[0].match(/:(.*?);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new File([u8arr], fileName, { type: mime });
}