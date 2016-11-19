class SidebarController {
    constructor ($transitions, AuthService) {
        this.transitions = $transitions;
        this.auth        = AuthService;
        this.name        = 'sidebar';
    }

    $onInit() {
        this.level = this.auth.getLoginLevel();

        this.transitions.onSuccess({}, (transition) => {
            this.level = this.auth.getLoginLevel();
        });
    }
}

SidebarController.$inject = ['$transitions', 'AuthService'];

export default SidebarController;
