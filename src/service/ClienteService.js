import axios from "axios";

export class ClienteService {

    listar() {
        return axios.get('http://localhost:8080/clientes');
    }

    inserir(objeto) {
        return axios.post('http://localhost:8080/cadcliente', objeto);
    }

    alterar(objeto) {
        return axios.put('http://localhost:8080/alterarcliente', objeto);
    }

    excluir(id) {
        return axios.delete(`http://localhost:8080/delcliente/${id}`);
    }
}
