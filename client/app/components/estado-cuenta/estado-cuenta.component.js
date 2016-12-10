import controller from './estado-cuenta.controller';
import template from './estado-cuenta.html';

const estadoCuentaComponent = {
	bindings: {
		documentos: '<',
		data: '<',
	},
	controller,
	template
};

export default estadoCuentaComponent;
