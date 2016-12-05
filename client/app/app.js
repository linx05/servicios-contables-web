//Dependencies
import angular from 'angular';
import uiRouter from 'angular-ui-router';
import 'arrive';
import 'angular-socket-io';
import angularUIBootstrap from 'angular-ui-bootstrap';
import 'angular-loading-bar';
import 'angular-toastr/dist/angular-toastr.tpls.min';
import 'moment';
import 'angular-moment';
//CSS
import 'angular-toastr/dist/angular-toastr.min.css';
import 'bootstrap-webpack';
import 'bootstrap-material-design';
import 'bootstrap-material-design/dist/css/bootstrap-material-design.min.css';
import 'bootstrap-material-design/dist/css/ripples.min.css';
import './app.css';
import 'angular-loading-bar/build/loading-bar.min.css';
import 'angular-loading-bar/build/loading-bar.min.js';

//App
import AppComponent from './app.component';
import Common from './common/common';
import Components from './components/components';
import Services from './services/services';
import { loadingBarConfig, toastrConfig } from './app.config';
import JwtOptions from './config/jwt.config';
import modalMiddleware from './config/modal-middleware.config';
import routesMiddleware from './config/routes-middleware.config';

const root = angular.module('app', [
    uiRouter,
    'btford.socket-io',
    angularUIBootstrap,
    'angular-loading-bar',
    'cfp.loadingBarInterceptor',
    'toastr',
    'angularMoment',
    Common,
    Services,
    Components
  ])
    .component('app',AppComponent)
    .config(JwtOptions)
    .config(loadingBarConfig)
    .config(toastrConfig)
    .run(modalMiddleware)
    .run(routesMiddleware)
    .name;

$.material.init();

document.addEventListener('DOMContentLoaded', () => angular.bootstrap(document, ['app']));

export default root;
