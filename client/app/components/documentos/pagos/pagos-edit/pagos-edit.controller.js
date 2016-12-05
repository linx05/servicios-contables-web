let pagos;

export default class pagosEditController {

	constructor(PagosService) {
	    'ngInject';
		pagos = PagosService;
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
		const pagosData = {
		    tipo: 'pago',
            total: data.pago.total,
            recibo: data.pago.recibo._id
		};
		const operation = data._id ? pagos.edit(data._id, pagosData)
								   : pagos.add(pagosData);

		this.error = false;
		this.onToggle();

		return operation
			.then(() => this.onAccept())
			.catch(error => this.error = true)
			.finally(() => this.onToggle());
	}
}
