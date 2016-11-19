export default class cuentasService {

    constructor(ApiService) {
        'ngInject';
        this.api = ApiService;
    }

    add(cliente) {
        return this.api.httpPost('cuentas', cliente)
            .then(data => data)
            .catch(this.api.requestFailed);
    }

    edit(id, cliente) {
        return this.api.httpPut(`cuentas/${id}`, cliente)
            .then(data => data)
            .catch(this.api.requestFailed);
    }

    find(id) {
        return this.api.httpGet(`cuentas/${id}`)
            .then(data => data)
            .catch(this.api.requestFailed);
    }

    get() {
        return this.api.httpGet('cuentas')
            .then(data => data)
            .catch(this.api.requestFailed);
    }

    remove(id) {
        return this.api.httpDelete(`cuentas/${id}`)
            .then(data => data)
            .catch(this.api.requestFailed);
    }

}
