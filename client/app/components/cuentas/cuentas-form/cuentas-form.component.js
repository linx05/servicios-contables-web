import controller from './cuentas-form.controller';
import template from './cuentas-form.html';

const CuentasFormComponent = {
	bindings: {
		data: '<',
		event: '<',
		onSave: '&',
	},
	controller,
	template
};

export default CuentasFormComponent;
