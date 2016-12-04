import controller from './documentos-form.controller';
import template from './documentos-form.html';

const DocumentosFormComponent = {
	bindings: {
		data: '<',
		event: '<',
		onSave: '&',
	},
	controller,
	template
};

export default DocumentosFormComponent;
