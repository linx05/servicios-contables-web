import controller from './cuentas-edit.controller';
import template from './cuentas-edit.html';

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
