import angular from 'angular';
import firmasFormComponent from './firmas-form.component';

const firmasForm = angular
	.module('firmas.form', [])
	.component('firmasForm', firmasFormComponent)
	.name;

export default firmasForm;
