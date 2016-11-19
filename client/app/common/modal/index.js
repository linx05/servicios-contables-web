import angular from 'angular';
import ModalService from './modal.service';
import './modal.css';

const modal = angular
    .module('modal', [])
    .service('ModalService', ModalService)
    .name;

export default modal;
