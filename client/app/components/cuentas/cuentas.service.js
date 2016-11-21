class CuentasService {

    constructor(ApiService, toastr) {
        this.api = ApiService;
        this.toastr = toastr;
    }

    add(cliente) {
        return this.api.httpPost('users', cliente)
            .then(data => {
                this.toastr.success('Se guardo la cuenta exitosamente!','Exito');
                return data;
            })
            .catch(this.api.requestFailed);
    }

    edit(id, cliente) {
        return this.api.httpPut(`users/${id}`, cliente)
            .then(data => {
                this.toastr.success('Se actualizo la cuenta exitosamente!','Exito');
                return data;
            })
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
            .then(data => {
                this.toastr.success('Se elimino la cuenta exitosamente!','Exito');
                return data;
            })
            .catch(this.api.requestFailed);
    }

}
CuentasService.$inject = ['ApiService', 'toastr'];
export default CuentasService;


