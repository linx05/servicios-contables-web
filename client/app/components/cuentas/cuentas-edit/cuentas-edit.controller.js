let cuentas;

export default class CuentasEditController {

	constructor(CuentasService) {
		cuentas = CuentasService;
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
		const cuentasData = {
			name: data.name,
			email: data.email,
			level: data.level,
			password: 'pass',
		};

		const operation = data._id ? cuentas.edit(data._id, cuentasData)
								   : cuentas.add(cuentasData);

		this.error = false;
		this.onToggle();

		return operation
			.then(() => this.onAccept())
			.catch(error => this.error = true)
			.finally(() => this.onToggle());
	}
}
CuentasEditController.$inject = ['CuentasService'];
