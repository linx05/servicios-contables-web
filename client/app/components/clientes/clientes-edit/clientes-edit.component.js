import controller from './clientes-edit.controller';
import template from './clientes-edit.html';

const clientesEditComponent = {
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

export default clientesEditComponent;
