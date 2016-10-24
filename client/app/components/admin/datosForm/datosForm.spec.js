import DatosFormModule from './datosForm'
import DatosFormController from './datosForm.controller';
import DatosFormComponent from './datosForm.component';
import DatosFormTemplate from './datosForm.html';

describe('DatosForm', () => {
  let $rootScope, makeController;

  beforeEach(window.module(DatosFormModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DatosFormController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(DatosFormTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = DatosFormComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(DatosFormTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(DatosFormController);
      });
  });
});
