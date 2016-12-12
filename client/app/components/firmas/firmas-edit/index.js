import angular from 'angular';
import firmasEditComponent from './firmas-edit.component';

const firmasEdit = angular
	.module('firmas.edit', [])
	.component('firmasEdit', firmasEditComponent)
	.name;

export default firmasEdit;
