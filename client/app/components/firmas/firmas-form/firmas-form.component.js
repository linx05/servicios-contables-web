import controller from './firmas-form.controller';
import template from './firmas-form.html';

const firmasFormComponent = {
	bindings: {
		data: '<',
		event: '<',
		onSave: '&',
	},
	controller,
	template
};

export default firmasFormComponent;
