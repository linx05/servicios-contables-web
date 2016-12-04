loadingBarConfig.$inject = ['cfpLoadingBarProvider'];
function loadingBarConfig (cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}

import angular from 'angular';

toastrConfig.$inject = ['toastrConfig'];
function toastrConfig (toastrConfig) {
    angular.extend(toastrConfig, {
        newestOnTop: true,
        positionClass: 'toast-bottom-right',
    });
}

export { loadingBarConfig, toastrConfig};
