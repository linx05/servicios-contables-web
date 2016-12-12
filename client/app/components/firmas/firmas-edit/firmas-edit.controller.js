let firmas;

export default class FirmasEditController {

	constructor(FirmasService) {
	    'ngInject';
		firmas = FirmasService;
	}

	$onInit() {
		this.error = false;
	}

	$onChanges(changes) {
		if (changes.data) {
			this.data = Object.assign({}, this.data);
		}
	}

	save({ firma }) {
		const firmaData = {
            fecha_vencimiento: firma.fecha_vencimiento,
			correo: firma.correo,
            time_diff_cantidad: firma.time_diff_cantidad,
            time_diff_medida: firma.time_diff_medida,
            cliente: firma.cliente,
            empleado: this.data.cuenta._id,
		};

		const operation = firma._id ? firmas.edit(firma._id, firmaData)
								   : firmas.add(firmaData);

		this.error = false;
		this.onToggle();

		return operation
			.then(() => this.onAccept())
			.catch(error => this.error = true)
			.finally(() => this.onToggle());
	}
}
