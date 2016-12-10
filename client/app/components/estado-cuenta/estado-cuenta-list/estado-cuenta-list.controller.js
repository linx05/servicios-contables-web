export default class ListDocumentosController {

	constructor() {
		'ngInject';
	}

	$onChanges(changes) {
		if (changes.data) {
			this.data = Object.assign({}, this.data);
		}
	}

    viewItem(item) {
        this.onViewItem({
            $event: {data: item}
        });
    }

	printItem(item) {
        this.onPrintItem({
            $event: {data: item}
        });
	}

}
