
export default function validarCelular (celular)  {
    const regex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;

    return (
      celular.length >= 1 &&
      celular.length <= 15 &&
      regex.test(celular)
    );
};


