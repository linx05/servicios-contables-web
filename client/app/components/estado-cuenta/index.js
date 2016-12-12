import angular from 'angular';
import listEstadoCuenta from './estado-cuenta-list';
import estadoCuenta from './estado-cuenta.component';


const estadoCuentaComponent = angular
    .module('estado-cuenta', [
        listEstadoCuenta
    ])
    .component('estadoCuenta', estadoCuenta)
    .config(($stateProvider, $urlRouterProvider) => {
        'ngInject';
        $stateProvider
            .state('estado', {
                url: '/estado:id',
                component: 'estadoCuenta',
                params: {
                    id: {value: null, squash: true},
                    isDeleting: false,
                    isModalOpen: false,
                },
                data: {
                    requiresLogin: true,
                    level: ['cliente']
                },
                resolve: {
                    data: function ($stateParams, DocumentosService) {
                        'ngInject';
                        if ($stateParams.data) return $stateParams.data;
                        return DocumentosService.get().then(result => {
                            let documentos = result.documentos;
                            const saldos = _.reduce(documentos, (saldo, documento) => {
                                if (documento.tipo == 'pago') {
                                    saldo.abonos += documento.pago.total;
                                    saldo.saldo -= documento.pago.total;
                                }
                                else if(documento.tipo == 'recibo') {
                                    saldo.cargos += documento.recibo.total;
                                    saldo.saldo += documento.recibo.total;
                                }
                                saldo.abonos = +(saldo.abonos).toFixed(2);
                                saldo.cargos = +(saldo.cargos).toFixed(2);
                                saldo.saldo = +(saldo.saldo).toFixed(2);
                                return saldo;
                            }, {saldo: 0, abonos: 0, cargos: 0});
                            return {
                                cliente: result.cliente,
                                documentos,
                                saldos
                            }
                        });
                    }
                }
            });
        $urlRouterProvider.otherwise('/home');
    })
    .name;

export default estadoCuentaComponent;
