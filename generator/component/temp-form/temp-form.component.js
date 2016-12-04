import controller from './<%= name %>-form.controller';
import template from './<%= name %>-form.html';

const <%= upName %>FormComponent = {
	bindings: {
		data: '<',
		event: '<',
		onSave: '&',
	},
	controller,
	template
};

export default <%= upName %>FormComponent;
