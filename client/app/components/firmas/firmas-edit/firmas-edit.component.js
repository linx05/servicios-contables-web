import controller from './firmas-edit.controller';
import template from './firmas-edit.html';

const CuentasEditComponent = {
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

export default CuentasEditComponent;
