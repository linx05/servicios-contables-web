export default class DocumentosItemController {

	constructor() {
		'ngInject';
	}

	$onChanges(changes) {
		if (changes.data) {
			this.data = Object.assign({}, this.data);
		}
	}

	select() {
		this.onSelect({
			$event: { data: this.data }
		});
	}

	delete() {
		this.onDelete({
			$event: { data: this.data }
		});
	}

}
