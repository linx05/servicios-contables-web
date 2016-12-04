import angular from 'angular';
import <%= upName %>FormComponent from './<%= name %>-form.component';

const <%= name %>Form = angular
	.module('<%= name %>.form', [])
	.component('<%= name %>Form', <%= upName %>FormComponent)
	.name;

export default <%= name %>Form;
