ModalMiddleware.$inject = ['$transitions', 'ModalService'];
export default function ModalMiddleware($transitions, ModalService) {
	$transitions.onSuccess({}, (transition) => {
		const params = transition.params();

		if (ModalService.isOpen && angular.isUndefined(params.isModalOpen) && !params.id) {
			ModalService.close();
		}

		if (ModalService.isOpen && params.isModalOpen && !params.isDeleting && !params.id) {
			ModalService.close();
		}
	});
}
