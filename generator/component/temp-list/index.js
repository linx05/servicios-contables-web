import angular from 'angular';
import <%= upName %>ListComponent from './<%= name %>-list.component';

const <%= name %>List = angular
	.module('<%= name %>.list', [])
	.component('<%= name %>List', <%= upName %>ListComponent)
	.name;

export default <%= name %>List;
