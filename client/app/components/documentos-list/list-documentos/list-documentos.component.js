import controller from './list-documentos.controller';
import template from './list-documentos.html';

const listDocumentosComponent = {
	bindings: {
		data: '<'
	},
	controller,
	template
};

export default listDocumentosComponent;
