class ClienteController {
  constructor(CuentasService) {
    this.name = 'cliente';
    this.cuentasService = CuentasService;
  }
  $onInit() {
      this.cuentasService.get()
          .then(cuentas => {
              this.cuentas = cuentas;
          });
  }
}
ClienteController.$inject = ['CuentasService'];

export default ClienteController;
