'use strict';

let controller = require('./user.controller');
let rolesMiddleware = require('../../middleware/roles.middleware');

let router = express.Router();

router.get('/', rolesMiddleware.admin, controller.index);
router.get('/:userId', rolesMiddleware.public, controller.show);
router.post('/', controller.createLocalAccount);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
