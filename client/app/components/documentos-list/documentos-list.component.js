import controller from './documentos-list.controller';
import template from './documentos-list.html';

const DocumentosListComponent = {
	bindings: {
		data: '<',
	},
	controller,
	template
};

export default DocumentosListComponent;
