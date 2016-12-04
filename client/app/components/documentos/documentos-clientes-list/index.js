import angular from 'angular';
import clientesDocumentosListComponent from './documentos-clientes-list.component';

let clienteModule = angular.module('clientesDocumentos.list', [])
    .component('clientesDocumentosList', clientesDocumentosListComponent)
    .name;

export default clienteModule;
