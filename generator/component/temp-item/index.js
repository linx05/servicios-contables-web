import angular from 'angular';
import <%= upName %>ItemComponent from './<%= name %>-item.component';

const <%= name %>Item = angular
	.module('<%= name %>.item', [])
	.component('<%= name %>Item', <%= upName %>ItemComponent)
	.name;

export default <%= name %>Item;
