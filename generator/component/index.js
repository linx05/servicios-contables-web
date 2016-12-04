import angular from 'angular';
import <%= upName %>Service from './<%= name %>.service';
import <%= upName %>Form from './<%= name %>-form';
import <%= upName %>Edit from './<%= name %>-edit';
import <%= upName %>Item from './<%= name %>-item';
import <%= upName %>List from './<%= name %>-list';
import <%= upName %> from './<%= name %>.component';

const <%= name %> = angular
	.module('<%= name %>', [
		<%= upName %>Form,
		<%= upName %>Edit,
		<%= upName %>Item,
		<%= upName %>List,
	])
	.service('<%= upName %>Service', <%= upName %>Service)
	.component('<%= name %>', <%= upName %>)
	.config(($stateProvider, $urlRouterProvider) => {
		'ngInject';
		$stateProvider
			.state('<%= name %>', {
				url: '/<%= name %>/:id',
				component: '<%= name %>',
				params: {
					id: { value: null, squash: true },
					isDeleting: false,
					isModalOpen: false,
				},
				data: {
					requiresLogin: true,
					level: ['admin']
				},
				resolve: {
					data: function ($stateParams, <%= upName %>Service) {
						'ngInject';
						if ($stateParams.data) return $stateParams.data;
						return <%= upName %>Service.get().then(data => data);

					},
					<%= name %>: function ($stateParams, <%= upName %>Service) {
						'ngInject';
						if ($stateParams.id === 'add' && !$stateParams.isModalOpen) return {};

						if ($stateParams.id && $stateParams.isModalOpen) return;

						if (!$stateParams.id && $stateParams.isDeleting) return;

						if (!$stateParams.id) return;
						return <%= upName %>Service.find($stateParams.id).then(data => data);
					},
				}
		});
		$urlRouterProvider.otherwise('/home');
	})
	.name;

export default <%= name %>;
