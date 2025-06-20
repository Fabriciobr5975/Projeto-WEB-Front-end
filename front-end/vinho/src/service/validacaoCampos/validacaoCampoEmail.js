
export default function validarEmail (email)  {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return (
      email.length >= 1 &&
      email.length <= 100 &&
      regex.test(email)
    );
};


