//Dependencies
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'arrive';
import 'angular-socket-io';
import angularUIBootstrap from 'angular-ui-bootstrap';
import 'angular-loading-bar';
import 'angular-toastr/dist/angular-toastr.tpls.min';

//CSS
import 'angular-toastr/dist/angular-toastr.min.css';
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
import { JwtOptionConfig, routesMiddleware, loadingBarConfig, toastrConfig } from './app.config';

const root = angular.module('app', [
    uiRouter,
    'btford.socket-io',
    angularUIBootstrap,
    'angular-loading-bar',
    'cfp.loadingBarInterceptor',
    'toastr',
    Common,
    Services,
    Components
  ])
    .component('app',AppComponent)
    .config(JwtOptionConfig)
    .config(loadingBarConfig)
    .config(toastrConfig)
    .run(routesMiddleware)
    .name;

$.material.init();

document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['app']));

export default root;
