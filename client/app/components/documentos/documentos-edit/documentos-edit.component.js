import controller from './documentos-edit.controller';
import template from './documentos-edit.html';

const DocumentosEditComponent = {
	bindings: {
		data: '<',
		event: '<',
		onAccept: '&',
		onCancel: '&',
		onToggle: '&',
	},
	controller,
	template
};

export default DocumentosEditComponent;
