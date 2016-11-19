export default class ClientesService {

    constructor(ApiService) {
        'ngInject';
        this.api = ApiService;
    }

    add(cliente) {
        return this.api.httpPost('clientes', cliente)
            .then(data => data)
            .catch(this.api.requestFailed);
    }

    edit(id, cliente) {
        return this.api.httpPut(`clientes/${id}`, cliente)
            .then(data => data)
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
            .then(data => data)
            .catch(this.api.requestFailed);
    }

}
