import angular from 'angular';
import sidebarComponent from './sidebar.component';

let sidebarModule = angular.module('sidebar', [])
    .component('sidebar', sidebarComponent)
    .name;

export default sidebarModule;
