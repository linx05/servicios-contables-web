import angular from 'angular';
import <%= upName %>EditComponent from './<%= name %>-edit.component';

const <%= name %>Edit = angular
	.module('<%= name %>.edit', [])
	.component('<%= name %>Edit', <%= upName %>EditComponent)
	.name;

export default <%= name %>Edit;
