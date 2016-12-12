import controller from './firmas.controller';
import template from './firmas.html';

const FirmasComponent = {
	bindings: {
		data: '<',
	},
	controller,
	template
};

export default FirmasComponent;
