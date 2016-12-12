let form;
import moment from 'moment';

export default class FirmasFormController {

    constructor () {
        this.dateOptions = {
            formatYear: 'YYYY',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        this.timeDiffMedidas = ['horas','dias'];
    }

    $onInit () {
    }

    $onChanges (changes) {
        if (changes.data) {
            this.firma = Object.assign({},{correo: this.data.cuenta.email}, this.data.firma);
            this.firma.fecha_vencimiento = moment(this.firma.fecha_vencimiento).toDate();
        }

        if (changes.event) {
            this.event = Object.assign({}, this.event);
            if (this.event.event === 'OK') this.onSubmit();
        }
    }

    onSubmit () {
        // if (form.$invalid) return form.$setSubmitted();
        this.onSave({
            $event: {firma: this.firma}
        });
    }

    setForm (f) {
        form = f;
    }

}
