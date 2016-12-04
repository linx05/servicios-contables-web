let documentosService, modal, modalOptions;

export default class DocumentosController {

	constructor(DocumentosService, ModalService) {
		'ngInject';
		documentosService = DocumentosService;
		modal          = ModalService;
		modalOptions   = {
			component: '<documentos-edit></documentos-edit>',
			title: 'Generacion de Documentos Electronicos',
			data: {},
			state: 'documentos',
			stateParams: { data: this.data },
		};
	}

	$onInit() {
		if (this.documentos) {
			this.edit(this.documentos);
		}
	}

	edit(documentos = {}) {
		modalOptions.data           = documentos;
		modalOptions.stateParams.id = documentos._id ? documentos._id : 'add';
		modal.show(modalOptions);
	}

	findAndEdit({ data }) {
		documentosService.find(data._id).then(data => this.edit(data));
	}

	remove({ data }) {
		modalOptions.id = data._id;
		modalOptions.service = documentosService;
		modal.warn(modalOptions);
	}

}
