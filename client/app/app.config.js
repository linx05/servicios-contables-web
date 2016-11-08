jwtInterceptor.$inject = ['$httpProvider', 'jwtInterceptorProvider'];
function jwtInterceptor ($httpProvider, jwtInterceptorProvider) {

    jwtInterceptorProvider.tokenGetter = ['AuthService', function (AuthService) {
        jwtInterceptorProvider.authPrefix = 'JWT ';
        if (AuthService.getToken() && AuthService.isTokenExpired()) {
            AuthService.refresh()
                .catch(function () {
                    AuthService.logout();
                });
        }
        return AuthService.getToken();
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
}

JwtOptionConfig.$inject = ['$httpProvider', 'jwtOptionsProvider'];
function JwtOptionConfig ($httpProvider, jwtOptionsProvider) {
    jwtOptionsProvider.config({
        whiteListedDomains: ['localhost', 'localhost:9000']
    });
}

routesMiddleware.$inject = ['$q', '$transitions', 'AuthService'];
function routesMiddleware ($q, $transitions, AuthService) {
    const q = $q;
    const auth = AuthService;
    const $state = $transitions._router.stateService;

    $transitions.onStart({}, (transition) => {
        const state = transition.to();

        if (!state) return redirectToHome();

        const levels = state.data.level;
        const requiresLogin = state.data.requiresLogin;

        if (typeof homeMiddleWare()                         !== 'undefined') return;
        if (typeof requiresLoginMiddleware(requiresLogin)   !== 'undefined') return;
        if (typeof levelsMiddleware(levels)                 !== 'undefined') return;

        function requiresLoginMiddleware (requiresLogin) {
            if ((requiresLogin && !auth.isLogged()) || (!requiresLogin && auth.isLogged())) {
                return redirectToHome();
            }
        }

        function levelsMiddleware (levels) {
            if (!levels) return true;

            if (!levels.includes(auth.getLoginLevel())) {
                return redirectToHome();
            }
        }

        function homeMiddleWare () {
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

    function getHome () {
        switch (auth.getLoginLevel()) {
            case 'admin'      :
                return 'admin';
            case 'empleado'   :
                return 'empleado';
            case 'cliente'    :
                return 'cliente';
            default           :
                return 'login';
        }
    }

    function redirectToHome () {
        return $state.go(getHome());
    }
}

loadingBarConfig.$inject = ['cfpLoadingBarProvider'];
function loadingBarConfig (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}

export {jwtInterceptor, JwtOptionConfig, routesMiddleware, loadingBarConfig};
