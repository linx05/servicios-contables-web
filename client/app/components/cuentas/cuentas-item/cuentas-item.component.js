import controller from './cuentas-item.controller';
import template from './cuentas-item.html';

const AccountItemComponent = {
	bindings: {
		data: '<',
		onSelect: '&',
		onDelete: '&',
	},
	controller,
	template
};

export default AccountItemComponent;
