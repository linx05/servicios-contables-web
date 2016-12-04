import controller from './<%= name %>-list.controller';
import template from './<%= name %>-list.html';

const <%= name %>ListComponent = {
	bindings: {
		data: '<',
		onSelectItem: '&',
		onDeleteItem: '&',
	},
	controller,
	template
};

export default <%= name %>ListComponent;
