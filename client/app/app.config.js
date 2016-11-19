JwtOptionConfig.$inject = ['$httpProvider', 'jwtOptionsProvider'];
function JwtOptionConfig ($httpProvider, jwtOptionsProvider) {
    jwtOptionsProvider.config({
        authPrefix : 'JWT ',
        whiteListedDomains: ['localhost'],
        tokenGetter: ['AuthService', (AuthService) => {
            if (AuthService.getToken() && AuthService.isTokenExpired()) {
                AuthService.refresh()
                    .catch(() => AuthService.logout());
            }
            return AuthService.getToken();
        }]
    });
    $httpProvider.interceptors.push('jwtInterceptor');
}
routesMiddleware.$inject = ['$q', '$transitions', 'AuthService'];
function routesMiddleware($q, $transitions, AuthService) {
    'ngInject';
    const q      = $q;
    const auth   = AuthService;
    const $state = $transitions._router.stateService;

    $state.defaultErrorHandler((error) => {
        // console.log(error);
    });

    $transitions.onStart({}, (transition) => {
        const state         = transition.to();
        const levels        = state.data.level;
        const requiresLogin = state.data.requiresLogin;

        if (!state) return redirectToHome();


        // if (typeof homeMiddleWare()                       !== 'undefined') return;
        if (typeof requiresLoginMiddleware(requiresLogin) !== 'undefined') return;
        if (typeof levelsMiddleware(levels)               !== 'undefined') return;

        function requiresLoginMiddleware(requiresLogin) {
            if ((requiresLogin && !auth.isLogged()) || (!requiresLogin && auth.isLogged())) {
                return redirectToHome();
            }
        }

        function levelsMiddleware(levels) {
            if (!levels) return true;

            if (!levels.includes(auth.getLoginLevel())) {
                return redirectToHome();
            }
        }

        function homeMiddleWare() {
            if (state.name === 'home') {
                return redirectToHome();
            }
        }
    });

    $transitions.onError({}, (transition) => {
        transition.promise
            .then(() => redirectToHome())
            .catch((error) => {
                if (error.constructor.name !== 'Rejection') {
                    redirectToHome();
                }
            });
    });

    function getHome() {
        switch (auth.getLoginLevel()) {
            case 'admin'  	: return 'admin';
            case 'empleado'	: return 'empleado';
            case 'cliente'	: return 'cliente';
            default			: return 'login';
        }
    }

    function redirectToHome() {
        return $state.go(getHome());
    }
}

loadingBarConfig.$inject = ['cfpLoadingBarProvider'];
function loadingBarConfig (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}

export {JwtOptionConfig, routesMiddleware, loadingBarConfig};
