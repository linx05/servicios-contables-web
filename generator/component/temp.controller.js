let <%= name %>Service, modal, modalOptions;

export default class <%= upName %>Controller {

	constructor(<%= upName %>Service, ModalService) {
		'ngInject';
		<%= name %>Service = <%= upName %>Service;
		modal          = ModalService;
		modalOptions   = {
			component: '<<%= name %>-edit></<%= name %>-edit>',
			title: '<%= name %>.edit.title',
			data: {},
			state: '<%= name %>',
			stateParams: { data: this.data },
		};
	}

	$onInit() {
		if (this.<%= name %>) {
			this.edit(this.<%= name %>);
		}
	}

	edit(<%= name %> = {}) {
		modalOptions.data           = <%= name %>;
		modalOptions.stateParams.id = <%= name %>._id ? <%= name %>._id : 'add';
		modal.show(modalOptions);
	}

	findAndEdit({ data }) {
		<%= name %>Service.find(data._id).then(data => this.edit(data));
	}

	remove({ data }) {
		modalOptions.id = data._id;
		modalOptions.service = <%= name %>Service;
		modal.warn(modalOptions);
	}

}
