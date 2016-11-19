import angular from 'angular';
import Header from './header';
import Sidebar from './sidebar';
import Modal from './modal';

let commonModule = angular.module('app.common', [
    Header,
    Sidebar,
    Modal
])
    .name;

export default commonModule;
