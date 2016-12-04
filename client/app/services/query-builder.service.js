class QueryBuilder {

	constructor() {
		this.query = '';
	}

	build() {
		// Must be implemented in the client service
	}

	getQuery() {
		const result = this.query;
		this.query = '';
		return result.length > 0 ? result.slice(0, -1) : '';
	}

	in(key, values = [], operator = '=') {
		this.query += key + operator + values.join() + '&';
		return this;
	}

	limit(value = 100) {
		this.query += 'limit=' + value + '&';
		return this;		
	}

	notIn(key, values = []) {
		return this.in(key, values, '!=');
	}

	skip(value = 0) {
		this.query += 'skip=' + value + '&';
		return this;
	}

	sort(key, sortType = '') {
		this.query += 'sort=' + sortType + key + '&';
		return this;
	}

	where(key, operator, value) {
		this.query += key + operator + value + '&';
		return this;
	}

}

export default function QueryBuilderService() {
	return {
		getInstance() {
			return new QueryBuilder();
		}
	};	
}