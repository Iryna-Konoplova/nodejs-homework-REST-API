const express = require('express');
const router = express.Router();
const { joiSchema } = require('../../models/contact');
const { controllerWrapper, validation, authenticate } = require('../../middlewares');
const { contacts: ctrl } = require('../../controllers');

router.get('/', authenticate, controllerWrapper(ctrl.getAll));

router.get('/:contactId', authenticate, controllerWrapper(ctrl.getById));

router.post('/', authenticate, validation(joiSchema), controllerWrapper(ctrl.add));

router.put('/:contactId', authenticate, validation(joiSchema), controllerWrapper(ctrl.updateById));

router.patch('/:contactId', authenticate, controllerWrapper(ctrl.updateFavorite));

router.delete('/:contactId', authenticate, controllerWrapper(ctrl.removeById));

module.exports = router;
