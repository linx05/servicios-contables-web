class LoginFormController {

	constructor() {}
	
	$onChanges(changes) {
		if (changes.data) {
			this.data = Object.assign({}, this.data);
		}
	}

	onSubmit() {
		if (!this.data.name || !this.data.password) return;

		this.onLogin({
			$event: { data: this.data }
		});
	}

}

export default LoginFormController;