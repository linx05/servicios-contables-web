import controller from './documentos-list.controller';
import template from './documentos-list.html';

const documentosListComponent = {
	bindings: {
		data: '<',
		onSelectItem: '&',
		onDeleteItem: '&',
	},
	controller,
	template
};

export default documentosListComponent;
