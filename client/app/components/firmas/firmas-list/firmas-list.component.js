import controller from './firmas-list.controller';
import template from './firmas-list.html';

const FirmasListComponent = {
	bindings: {
		data: '<',
        onSelectItem: '&',
        onDeleteItem: '&',
	},
	controller,
	template
};

export default FirmasListComponent;
