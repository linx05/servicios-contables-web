JwtOptionConfig.$inject = ['$httpProvider', 'jwtOptionsProvider'];
export default function JwtOptionConfig ($httpProvider, jwtOptionsProvider) {
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
