export default class cuentasService {

    constructor(ApiService) {
        'ngInject';
        this.api = ApiService;
    }

    add(cliente) {
        return this.api.httpPost('users', cliente)
            .then(data => data)
            .catch(this.api.requestFailed);
    }

    edit(id, cliente) {
        return this.api.httpPut(`users/${id}`, cliente)
            .then(data => data)
            .catch(this.api.requestFailed);
    }

    find(id) {
        return this.api.httpGet(`users/${id}`)
            .then(data => data)
            .catch(this.api.requestFailed);
    }

    get() {
        return this.api.httpGet('users')
            .then(data => data)
            .catch(this.api.requestFailed);
    }

    remove(id) {
        return this.api.httpDelete(`users/${id}`)
            .then(data => data)
            .catch(this.api.requestFailed);
    }

}
