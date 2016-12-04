import controller from './recibos-edit.controller';
import template from './recibos-edit.html';

const recibosEditComponent = {
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

export default recibosEditComponent;
