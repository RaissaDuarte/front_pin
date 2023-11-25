import axios from "axios";


export class VendaService{

    listar(){
        return axios.get('http://localhost:8080/vendas');
    }

    inserir(objeto){
        return axios.post('http://localhost:8080/cadvenda', objeto);
    }

    alterar(){
        return axios.put('http://localhost:8080/alterarvenda', objeto);
    }

    excluir(id){
        return axios.delete('http://localhost:8080/delvenda' + id);
    }
}