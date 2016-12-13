'use strict';

let controller = require('./documento.controller.js');
let rolesMiddleware = require('../../middleware/roles.middleware');

let router = express.Router();

router.get('/', rolesMiddleware.user, controller.index);
router.get('/:userId', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
