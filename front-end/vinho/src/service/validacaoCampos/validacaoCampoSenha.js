
export default function validarSenha (senha)  {
    const regex = /^[a-zA-Z0-9@#$%&*!?]+$/;

    return (
      senha.length >= 8 &&
      senha.length <= 64 &&
      regex.test(senha) &&
      /[A-Z]/.test(senha) &&
      /\d/.test(senha) &&
      /[@#$%&*!?]/.test(senha)
    );
};


