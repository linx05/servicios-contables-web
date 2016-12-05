import controller from './documentos-list.controller';
import template from './documentos-list.html';

const DocumentosListComponent = {
	bindings: {
		documentos: '<',
		data: '<',
	},
	controller,
	template
};

export default DocumentosListComponent;
