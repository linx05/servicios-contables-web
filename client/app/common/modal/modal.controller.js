class ModalController {

    constructor ($uibModalInstance, title, data) {
        this.data = data;
        this.title = title;
        this.modalInstance = $uibModalInstance;
        this.properties = data;
        this.event = {event: 'INIT'};
        this.loading = false;
    }

    cancel () {
        this.modalInstance.dismiss();
    }

    ok () {
        this.modalInstance.close();
    }

    setEvent (e) {
        this.event = {event: e};
    }

    toggleOkButton () {
        this.loading = !this.loading;
    }

}
ModalController.$inject = ['$uibModalInstance', 'title', 'data'];
export default ModalController;
