export default class FirmasService {

	constructor(ResourceService) {
		'ngInject';
		Object.assign(this, ResourceService.getInstance());
		this.setResource('firmas');
	}

}
