export default class <%= upName %>Service {

	constructor(ResourceService) {
		'ngInject';
		Object.assign(this, ResourceService.getInstance());
		this.setResource('<%= name %>');
	}

}
