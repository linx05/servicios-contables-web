import controller from './<%= name %>-item.controller';
import template from './<%= name %>-item.html';

const <%= upName %>ItemComponent = {
	bindings: {
		data: '<',
		onSelect: '&',
		onDelete: '&',
	},
	controller,
	template
};

export default <%= upName %>ItemComponent;
