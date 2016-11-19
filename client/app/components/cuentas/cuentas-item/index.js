import angular from 'angular';
import CuentasItemComponent from './cuentas-item.component';

const cuentasItem = angular
	.module('cuentas.item', [])
	.component('cuentasItem',CuentasItemComponent)
	.name;

export default cuentasItem;
