let state, authService;

class LoginController {

	constructor($state, AuthService) {
		state = $state;
		authService = AuthService;
		this.credentials = null;
		this.error = false;
	}

	$onInit() {}

	login({ data }) {
		this.error = false;

		return authService.login(data.name, data.password)
			.then((response) => {
				switch (authService.getLoginLevel()) {
					case 'admin'      : return state.go('admin');
					case 'employee'   : return state.go('employee');
					case 'user'       : return state.go('home');
					default           : return state.go('login');
				}
			})
			.catch((error) => {
				this.error = true;
			});
	}

}

LoginController.$inject = ['$state', 'AuthService'];

export default LoginController;
