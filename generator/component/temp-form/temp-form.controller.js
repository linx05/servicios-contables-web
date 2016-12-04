let form;

export default class <%= upName %>FormController {

	constructor() {
		'ngInject';
	}

	$onInit() {
	}

	$onChanges(changes) {
		if (changes.data) {
			this.data = Object.assign({}, this.data);
		}

		if (changes.event) {
			this.event = Object.assign({}, this.event);
			if (this.event.event === 'OK') this.onSubmit();
		}
	}

	onSubmit() {
		if (form.$invalid) return form.$setSubmitted();
		this.onSave({
			$event: { data: this.data }
		});
	}

	setForm(f) {
		form = f;
	}

}
