export default class RecibosService {

	constructor(ResourceService) {
		'ngInject';
		Object.assign(this, ResourceService.getInstance());
		this.setResource('recibos');
	}

}
