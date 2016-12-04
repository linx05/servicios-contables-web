import controller from './documentos.controller';
import template from './documentos.html';

const DocumentosComponent = {
	bindings: {
		documentos: '<',
		data: '<',
	},
	controller,
	template
};

export default DocumentosComponent;
