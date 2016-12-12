export default class FirmasListController {

	constructor() {
		'ngInject';
	}

	$onChanges(changes) {
		if (changes.data) {
			this.data = Object.assign({}, this.data);
		}
	}

    selectItem(item) {
        this.onSelectItem({
            $event: {data: item}
        });
    }

    deleteItem(item) {
        this.onDeleteItem({
            $event: {data: item}
        });
    }

}
