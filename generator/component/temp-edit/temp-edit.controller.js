let <%= name %>;

export default class <%= upName %>EditController {

	constructor(<%= upName %>Service) {
		'ngInject';
	<%= name %> = <%= upName %>Service;
	}

	$onInit() {
		this.error = false;
	}

	$onChanges(changes) {
		if (changes.data) {
			this.data = Object.assign({}, this.data);
		}

		if (changes.event) {
			// If an event occurs must not be reassigned here
			// because will cause a duplication of the said event
			// this.event = Object.assign({}, this.event);
		}
	}

	save({ data }) {
		const <%= name %>Data = {
			name: data.name,
			email: data.email
		};

		const operation = data._id ? <%= name %>.edit(data._id, <%= name %>Data)
								   : <%= name %>.add(a<%= name %>Data);

		this.error = false;
		this.onToggle();

		return operation
			.then(() => this.onAccept())
			.catch(error => this.error = true)
			.finally(() => this.onToggle());
	}

}
