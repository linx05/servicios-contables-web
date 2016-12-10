import controller from './estado-cuenta-list.controller';
import template from './estado-cuenta-list.html';

const estadoCuentaListComponent = {
    bindings: {
        data: '<',
        onViewItem: '&',
        onPrintItem: '&'
    },
    controller,
    template
};

export default estadoCuentaListComponent;
