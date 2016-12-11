import angular from 'angular';
import ListDocumentos from './list-documentos';
import DocumentosList from './documentos-list.component';

const documentosList = angular
	.module('documentos-list', [
		ListDocumentos
	])
	.component('documentosList', DocumentosList)
	.config(($stateProvider, $urlRouterProvider) => {
		'ngInject';
		$stateProvider
			.state('documentos-list', {
				url: '/documentos-list/:id',
				component: 'documentosList',
				params: {
					id: { value: null, squash: true },
					isDeleting: false,
					isModalOpen: false,
				},
				data: {
					requiresLogin: true,
					level: ['admin','empleado']
				},
				resolve: {
					data: function ($stateParams, DocumentosService) {
						'ngInject';
						if ($stateParams.data) return $stateParams.data;
						return DocumentosService.get().then(documentos => documentos);
					}
				}
		});
		$urlRouterProvider.otherwise('/home');
	})
	.name;

export default documentosList;
