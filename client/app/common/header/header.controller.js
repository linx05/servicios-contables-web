let state, authService, transitions;

class HeaderController {

    constructor ($transitions, $state, AuthService) {
        transitions = $transitions;
        state = $state;
        authService = AuthService;
    }

    $onInit() {
        this.level = authService.getLoginLevel();

        transitions.onSuccess({}, (transition) => {
            this.level = authService.getLoginLevel();
        });
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
export default HeaderController;
