class ClientesService {

    constructor(ApiService, toastr) {
        this.api = ApiService;
        this.toastr = toastr;
    }

    add(cliente) {
        return this.api.httpPost('clientes', cliente)
            .then(data => {
                this.toastr.success('Se guardo el cliente exitosamente!','Exito');
                return data;
            })
            .catch(this.api.requestFailed);
    }

    edit(id, cliente) {
        return this.api.httpPut(`clientes/${id}`, cliente)
            .then(data => {
                this.toastr.success('Se actualizo el cliente exitosamente!','Exito');
                return data;
            })
            .catch(this.api.requestFailed);
    }

    find(id) {
        return this.api.httpGet(`clientes/${id}`)
            .then(data => data)
            .catch(this.api.requestFailed);
    }

    get() {
        return this.api.httpGet('clientes')
            .then(data => data)
            .catch(this.api.requestFailed);
    }

    remove(id) {
        return this.api.httpDelete(`clientes/${id}`)
            .then(data => {
                this.toastr.success('Se elimino el cliente exitosamente!','Exito');
                return data;
            })
            .catch(this.api.requestFailed);
    }

}
ClientesService.$inject = ['ApiService', 'toastr'];
export default ClientesService;


