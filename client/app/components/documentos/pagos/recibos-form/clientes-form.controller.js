let form;

class ClientesFormController {

    constructor(WizardHandler) {
        this.wizard = WizardHandler;
        this.repeatConcepto = [0];
        this.periocidad = ['mensual', 'bimestral', 'trimestral', 'cuatrimestral', 'semestral', 'anual'];
    }

    $onInit() {
    }

    $onChanges(changes) {
        if (changes.data) {
            this.data = Object.assign({}, this.data);
            this.data.perfil = Object.assign([], this.data.perfil);
            _.forEach(this.data.perfil,()=>{
                this.addPerfil();
            });
            this.repeatConcepto.pop();
        }

        if (changes.event) {
            this.event = Object.assign({}, this.event);
            if (this.event.event === 'OK') this.onSubmit();
        }
    }

    addPerfil() {
        this.repeatConcepto.push(this.repeatConcepto.length);
    }

    checkStep() {
        let currentStep = this.wizard.wizard().currentStepNumber();
        let totalSteps  = this.wizard.wizard().totalStepCount();
        if(currentStep === totalSteps) {
            this.canSubmit = true;
        }
    }

    removePerfil() {
        if (this.repeatConcepto.length>1) {
            this.repeatConcepto.pop();
            this.data.perfil.pop();
        }
    }

    onSubmit() {
        if(this.canSubmit) {
            this.onSave({
                $event: { data: this.data }
            });
        }
    }
}
ClientesFormController.$inject = ['WizardHandler'];
export default ClientesFormController;
