
export default function impedirAcessoTelaAdministrador(cliente, navigate) {
    if (!cliente?.acesso || !sessionStorage.getItem("cliente")) {
        navigate("/notfound");
    }
}