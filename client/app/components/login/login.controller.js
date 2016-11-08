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
					case 'empleado'   : return state.go('empleado');
					case 'cliente'    : return state.go('cliente');
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
