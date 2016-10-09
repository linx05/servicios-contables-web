import template from './employee.html';
import controller from './employee.controller';
import './employee.css';

let employeeComponent = {
  restrict: 'E',
  bindings: {},
  template,
  controller
};

export default employeeComponent;
