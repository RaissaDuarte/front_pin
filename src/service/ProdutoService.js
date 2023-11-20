import axios from "axios";


export class ProdutoService{

    listar(){
        return axios.get('http://localhost:8080/produtos');
    }

    inserir(objeto){
        return axios.post('http://localhost:8080/cadprod', objeto);
    }

    alterar(){
        return axios.put('http://localhost:8080/alterarprod', objeto);
    }

    excluir(id){
        return axios.delete('http://localhost:8080/delprod' + id);
    }
}