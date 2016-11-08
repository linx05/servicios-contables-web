import ClienteModule from './cliente'
import ClienteController from './cliente.controller';
import ClienteComponent from './cliente.component';
import ClienteTemplate from './cliente.html';

describe('Cliente', () => {
  let $rootScope, makeController;

  beforeEach(window.module(ClienteModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ClienteController();
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
      expect(ClienteTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = ClienteComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(ClienteTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(ClienteController);
      });
  });
});
