import angular from 'angular';
import DocumentosService from './documentos.service';
import DocumentosForm from './documentos-form';
import DocumentosEdit from './documentos-edit';
import DocumentosItem from './documentos-item';
import DocumentosList from './documentos-list';
import Documentos from './documentos.component';

const documentos = angular
	.module('documentos', [
		DocumentosForm,
		DocumentosEdit,
		DocumentosItem,
		DocumentosList,
	])
	.service('DocumentosService', DocumentosService)
	.component('documentos', Documentos)
	.config(($stateProvider, $urlRouterProvider) => {
		'ngInject';
		$stateProvider
			.state('documentos', {
				url: '/documentos/:id',
				component: 'documentos',
				params: {
					id: { value: null, squash: true },
					isDeleting: false,
					isModalOpen: false,
				},
				data: {
					requiresLogin: true,
					level: ['admin','employee']
				},
				resolve: {
					data: function ($stateParams, DocumentosService) {
						'ngInject';
						if ($stateParams.data) return $stateParams.data;
						return DocumentosService.get().then(data => data);

					},
					documentos: function ($stateParams, DocumentosService) {
						'ngInject';
						if ($stateParams.id === 'add' && !$stateParams.isModalOpen) return {};

						if ($stateParams.id && $stateParams.isModalOpen) return;

						if (!$stateParams.id && $stateParams.isDeleting) return;

						if (!$stateParams.id) return;
						return DocumentosService.find($stateParams.id).then(data => data);
					},
				}
		});
		$urlRouterProvider.otherwise('/home');
	})
	.name;

export default documentos;
