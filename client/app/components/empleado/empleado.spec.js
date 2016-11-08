import EmployeeModule from './empleado'
import EmployeeController from './empleado.controller';
import EmployeeComponent from './empleado.component';
import EmployeeTemplate from './empleado.html';

describe('empleado', () => {
  let $rootScope, makeController;

  beforeEach(window.module(EmployeeModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new EmployeeController();
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
      expect(EmployeeTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = EmployeeComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(EmployeeTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(EmployeeController);
      });
  });
});