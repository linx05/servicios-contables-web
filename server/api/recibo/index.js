'use strict';

let controller = require('./recibo.controller.js');
let rolesMiddleware = require('../../middleware/roles.middleware');

let router = express.Router();

router.get('/', rolesMiddleware.employee, controller.index);
router.get('/:userId', rolesMiddleware.employee, controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
