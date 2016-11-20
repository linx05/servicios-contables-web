let clientes;

export default class clientesEditController {

	constructor(ClientesService) {
		clientes = ClientesService;
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
		const clientesData = {
			name: data.name,
			email: data.email,
			level: data.level,
			password: '123456789',
		};

		const operation = data._id ? clientes.edit(data._id, clientesData)
								   : clientes.add(clientesData);

		this.error = false;
		this.onToggle();

		return operation
			.then(() => this.onAccept())
			.catch(error => this.error = true)
			.finally(() => this.onToggle());
	}
}
clientesEditController.$inject = ['ClientesService'];
