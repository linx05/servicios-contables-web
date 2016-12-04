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
            datos_basicos: {
                rfc: data.rfc,
                razon_social: data.razon_social,
                domicilio: data.domicilio,
            },
            contacto: data.contacto,
            esquema_pago: data.esquema_pago,
            perfil: data.perfil
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
