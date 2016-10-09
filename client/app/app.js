//Dependencies
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularSocketIO from 'angular-socket-io';
import angularUIBootstrap from 'angular-ui-bootstrap';
import loadingBar from 'angular-loading-bar';

//CSS
import bootstrap from 'bootstrap-webpack';
import material from 'bootstrap-material-design';
import materialCss from 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import ripplesCss from 'bootstrap-material-design/dist/css/ripples.min.css';
import appCss from './app.css';
import loadingBarCss from 'angular-loading-bar/build/loading-bar.min.css';
import loadingBarJs from 'angular-loading-bar/build/loading-bar.min.js';

//App
import AppComponent from './app.component';
import Common from './common/common';
import Components from './components/components';
import Services from './services/services';
import { jwtInterceptor, JwtOptionConfig, routesMiddleware, loadingBarConfig } from './app.config';

const root = angular.module('app', [
    uiRouter,
    'btford.socket-io',
    angularUIBootstrap,
    'angular-loading-bar',
    'cfp.loadingBarInterceptor',

    Common,
    Services,
    Components
  ])
    .component('app',AppComponent)
    .config(jwtInterceptor)
    .config(JwtOptionConfig)
    .config(loadingBarConfig)
    .run(routesMiddleware)
    .name;

$.material.init();

document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['app']));

export default root;
