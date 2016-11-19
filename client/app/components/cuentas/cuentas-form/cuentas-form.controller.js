let form;

export default class CuentasFormController {

    constructor () {
    }

    $onInit () {
        this.levels = [
            {id: 'admin',     name: 'Administrador'},
            {id: 'empleado',  name: 'Empleado'},
            {id: 'cliente',   name: 'Cliente'},
        ];
    }

    $onChanges (changes) {
        if (changes.data) {
            this.data = Object.assign({}, this.data);
            this.data.name = this.data.full_name;
            if (angular.isUndefined(this.data.active)) {
                this.data.active = true;
            }
        }

        if (changes.event) {
            this.event = Object.assign({}, this.event);
            if (this.event.event === 'OK') this.onSubmit();
        }
    }

    onSubmit () {
        if (form.$invalid) return form.$setSubmitted();
        this.onSave({
            $event: {data: this.data}
        });
    }

    setForm (f) {
        form = f;
    }

}
