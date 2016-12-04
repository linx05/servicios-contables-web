import controller from './<%= name %>.controller';
import template from './<%= name %>.html';

const <%= upName %>Component = {
	bindings: {
		<%= name %>: '<',
		data: '<',
	},
	controller,
	template
};

export default <%= upName %>Component;
