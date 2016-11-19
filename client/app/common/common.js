import angular from 'angular';
import Header from './header';
import Sidebar from './sidebar';

let commonModule = angular.module('app.common', [
    Header,
    Sidebar
])
    .name;

export default commonModule;
