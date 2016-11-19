class SidebarController {
    constructor (AuthService) {
        this.auth = AuthService;
        this.name = 'sidebar';
    }
}

SidebarController.$inject = ['AuthService'];

export default SidebarController;
