export default function ResourceService(ApiService, QueryBuilderService) {
	'ngInject';
	function Service() {
		this.api      = ApiService;
		this.resource = '';
		this.builder  = QueryBuilderService.getInstance();

		this.builder.build = (callback) => {
			if (typeof callback === 'function') {
				return callback(this.builder.getQuery());
			}
			return this.get(this.builder.getQuery());
		};

		this.add = (data) => {
			return this.api.httpPost(this.resource, data)
				.then(data => data)
				.catch(this.api.requestFailed);
		};

		this.edit = (id, data) => {
			return this.api.httpPut(this.resource + '/' + id, data)
				.then(data => data)
				.catch(this.api.requestFailed);
		};

		this.find = (id) => {
			return this.api.httpGet(this.resource + '/' + id)
				.then(data => data)
				.catch(this.api.requestFailed);
		};

		this.get = (params = '') => {
			params = params ? '?' + params : '';
			return this.api.httpGet(this.resource + params)
				.then(data => data)
				.catch(this.api.requestFailed);
		};

		this.remove = (id) => {
			return this.api.httpDelete(this.resource + '/' + id)
				.then(data => data)
				.catch(this.api.requestFailed);
		};

		this.setResource = (r) => {
			this.resource = r;
		};
	}

	return {
		getInstance() {
			return new Service();
		}
	};
}
