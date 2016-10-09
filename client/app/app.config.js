jwtInterceptor.$inject = ['$httpProvider', 'jwtInterceptorProvider'];
function jwtInterceptor($httpProvider, jwtInterceptorProvider) {

    jwtInterceptorProvider.tokenGetter = ['AuthService', function (AuthService) {
        jwtInterceptorProvider.authPrefix = 'JWT ';
        if (AuthService.getToken() && AuthService.isTokenExpired()) {
            AuthService.refresh()
            .catch(function() { AuthService.logout(); });
        }
        return AuthService.getToken();
    }];

    $httpProvider.interceptors.push('jwtInterceptor');
}

JwtOptionConfig.$inject = ['$httpProvider', 'jwtOptionsProvider'];
function JwtOptionConfig($httpProvider, jwtOptionsProvider){
    jwtOptionsProvider.config({
        whiteListedDomains: ['localhost','localhost:9000']
    });
}

routesMiddleware.$inject = ['$rootScope', '$transitions', 'AuthService'];
function routesMiddleware($rootScope, $transitions, AuthService) {
    const auth = AuthService;
    const $state = $transitions._router.stateService;

    $state.defaultErrorHandler((error) => {
        // console.log(error);
    });

    $rootScope.$on('$locationChangeStart', (event, to) => {
        const state = getState(to);

        if (!state) {
            event.preventDefault();
            return redirectToHome();
        }
        if(state.data){

        }
        const levels        = state.data.level;
        const requiresLogin = state.data.requiresLogin;

        if (typeof homeMiddleWare()          !== 'undefined') return;
        if (typeof requiresLoginMiddleware() !== 'undefined') return;
        if (typeof levelsMiddleware()        !== 'undefined') return;

        function requiresLoginMiddleware() {
            if ((requiresLogin && !auth.isLogged()) || (!requiresLogin && auth.isLogged())) {
                event.preventDefault();
                return redirectToHome();
            }
        }

        function levelsMiddleware() {
            if (!levels) return true;

            if (!levels.includes(auth.getLoginLevel())) {
                event.preventDefault();
                return redirectToHome();
            }
        }

        function homeMiddleWare() {
            if (state.name === 'home') {
                event.preventDefault();
                return redirectToHome();
            }
        }
    });

    $transitions.onError({}, (transition) => {
        return redirectToHome();
    });

    function getState(url) {
        const ignoreQueryParams = (urlWithParams) => {
            const queryParams = urlWithParams.indexOf('?');
            return queryParams !== -1 ? urlWithParams.slice(0, queryParams) : urlWithParams;
        };

        url = ignoreQueryParams(url);

        const states = $state.get().filter(function (state) {
            let fullUrl = window.location.origin + '/#' + ignoreQueryParams(state.url);
            return fullUrl === url;
        });

        return states.length > 0 ? states[0] : null;
    }

    function redirectToHome() {
        switch (auth.getLoginLevel()) {
            case 'admin'      : return $state.go('admin');
            case 'employee'   : return $state.go('employee');
            case 'user'       : return $state.go('user');
            default           : return $state.go('login');
        }
    }
}

loadingBarConfig.$inject = ['cfpLoadingBarProvider'];
function loadingBarConfig(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}

export { jwtInterceptor, JwtOptionConfig, routesMiddleware, loadingBarConfig };
