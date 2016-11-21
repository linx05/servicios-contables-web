const routes = {
    api: 'http://localhost:9000'
};
let http, q, toast;

class ApiService {

    constructor($http, $q, toastr) {
        http = $http;
        q = $q;
        toast = toastr;
        routes.api += '/api/';
    }

    getApiUrl() {
        return this.apiServer;
    }

    httpExecute(urlResource, method, data = null) {
        return http({
            url: routes.api + urlResource,
            method: method,
            data: data,
        })
            .then(this.requestComplete)
            .catch(this.requestFailed.bind(this));
    }

    httpGet(url) {
        return this.httpExecute(url, 'GET');
    }

    httpPost(url, data) {
        return this.httpExecute(url, 'POST', data);
    }

    httpPut(url, data) {
        return this.httpExecute(url, 'PUT', data);
    }

    httpDelete(url) {
        return this.httpExecute(url, 'DELETE');
    }

    requestComplete(response) {
        return response.data;
    }

    requestFailed(error) {
        toast.error('No se pudo llevar a cabo la operacion!','Error');
        return q.reject(error);
    }

}

ApiService.$inject = ['$http', '$q', 'toastr'];

export default ApiService;
