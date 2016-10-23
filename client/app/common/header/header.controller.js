let state, authService;

class HeaderController {

    constructor ($state, AuthenticationService) {
        state = $state;
        authService = AuthenticationService;
    }

    getLoginName () {
        return authService.getLoginName();
    }

    isAdmin () {
        return authService.isAdmin();
    }

    isEmployee () {
        return authService.isEmployee();
    }

    isLogged () {
        return authService.isLogged();
    }

    isUser () {
        return authService.isUser();
    }

    logout () {
        authService.logout();
        state.go('login');
    }

}

HeaderController.$inject = ['$state', 'AuthService'];

export default HeaderController;
