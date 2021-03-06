import angular from 'angular';
import DocumentosService from './documentos.service';
import ClienteDocumentosList from './documentos-clientes-list';
import Documentos from './documentos.component';

import Recibos from './recibos';
import Pagos from './pagos';

const documentos = angular
	.module('documentos', [
        ClienteDocumentosList,
        Recibos,
        Pagos
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
					level: ['admin','empleado']
				},
				resolve: {
					data: function ($stateParams, DocumentosService, ClientesService) {
						'ngInject';
						if ($stateParams.data) return $stateParams.data;
						return DocumentosService.get().then(documentos => {
                            return ClientesService.get().then(clientes => {
                                return {
                                    clientes,
                                    documentos
                                }
                            });
                        });


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
