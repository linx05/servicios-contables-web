export default class DocumentosService {

	constructor(ResourceService) {
		'ngInject';
		Object.assign(this, ResourceService.getInstance());
		this.setResource('documentos');
	}

}
