let documentos;

export default class DocumentosEditController {

	constructor(DocumentosService) {
		'ngInject';
	documentos = DocumentosService;
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
		const documentosData = {
			name: data.name,
			email: data.email
		};

		const operation = data._id ? documentos.edit(data._id, documentosData)
								   : documentos.add(adocumentosData);

		this.error = false;
		this.onToggle();

		return operation
			.then(() => this.onAccept())
			.catch(error => this.error = true)
			.finally(() => this.onToggle());
	}

}
