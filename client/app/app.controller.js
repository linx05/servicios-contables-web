let state, transitions;

export default class AppController {

    constructor($state, $transitions, AuthService) {
        'ngInject';
        state       = $state;
        transitions = $transitions;
        this.auth   = AuthService;
    }

    $onInit() {
        this.isLogged = this.auth.isLogged();
        this.user = this.auth.getDecodedToken();

        transitions.onSuccess({}, (transition) => {
            this.isLogged = this.auth.isLogged();
            this.user = this.auth.getDecodedToken();
        });
    }

    logout() {
        return this.auth.logout()
            .then(() => state.go('login'));
    }

}
