import controller from './modal.controller';
import template from './modal.html';

class ModalService {

	constructor($uibModal, $q) {
		this.modal = $uibModal;
		this.$q        = $q;
	}

	generateTemplate(component) {
		const bindings = ` 
			data="$ctrl.data" 
			event="$ctrl.event" 
			on-accept="$ctrl.ok()" 
			on-cancel="$ctrl.cancel()" 
			on-toggle="$ctrl.toggleOkButton()">`;

		component = component.replace('>', bindings);

		return template.replace('${component}', component);
	}

	show({ component, title, data = null } ) {
		return this.modal.open({
			bindToController: true,
			controller,
			controllerAs: '$ctrl',
			template: this.generateTemplate(component),
			resolve: { title: () => title, data: () => data }
		})
            .result
		    .then(data => data)
		    .catch(error => this.$q.reject(error));
	}
}

ModalService.$inject = ['$uibModal', '$q'];
export default ModalService;
