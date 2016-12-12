import angular from 'angular';
import firmasList from './firmas-list';
import firmasEdit from './firmas-edit';
import firmasForm from './firmas-form';
import firmasComponent from './firmas.component';
import firmasService from './firmas.service';

const firmas = angular
	.module('firmas', [
		firmasList,
        firmasEdit,
        firmasForm
	])
    .service('FirmasService', firmasService)
	.component('firmas', firmasComponent)
	.config(($stateProvider, $urlRouterProvider) => {
		'ngInject';
		$stateProvider
			.state('firmas', {
				url: '/firmas/:id',
				component: 'firmas',
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
					data: function ($stateParams, FirmasService) {
						'ngInject';
						if ($stateParams.data) return $stateParams.data;
						return FirmasService.get().then(firmas => firmas);
					}
				}
		});
		$urlRouterProvider.otherwise('/home');
	})
	.name;

export default firmas;
