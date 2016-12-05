import controller from './pagos-edit.controller';
import template from './pagos-edit.html';

const pagosEditComponent = {
	bindings: {
		data: '<',
		event: '<',
		onAccept: '&',
		onCancel: '&',
		onToggle: '&',
	},
	controller,
	template
};

export default pagosEditComponent;
