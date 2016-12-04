import controller from './documentos-item.controller';
import template from './documentos-item.html';

const DocumentosItemComponent = {
	bindings: {
		data: '<',
		onSelect: '&',
		onDelete: '&',
	},
	controller,
	template
};

export default DocumentosItemComponent;
