'use strict';

let controller = require('./firma.controller.js');
let rolesMiddleware = require('../../middleware/roles.middleware');

let router = express.Router();

router.get('/', rolesMiddleware.employee, controller.index);
router.get('/:id', rolesMiddleware.employee, controller.show);
router.post('/', rolesMiddleware.employee, controller.create);
router.put('/:id', rolesMiddleware.employee, controller.update);
router.delete('/:id', rolesMiddleware.employee, controller.destroy);

module.exports = router;
