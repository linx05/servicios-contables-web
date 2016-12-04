import controller from './<%= name %>-edit.controller';
import template from './<%= name %>-edit.html';

const <%= upName %>EditComponent = {
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

export default <%= upName %>EditComponent;
