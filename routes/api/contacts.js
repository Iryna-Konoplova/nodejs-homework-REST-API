const express = require('express')
const router = express.Router()
const { joiSchema } = require('../../models/contact')
const { controllerWrapper, validation } = require('../../middlewares')
const { contacts: ctrl } = require('../../controllers');

router.get('/', ctrl.getAll);

router.get('/:contactId', controllerWrapper(ctrl.getById));

router.post('/', validation(joiSchema), controllerWrapper(ctrl.add));

router.put('/:contactId', validation(joiSchema), controllerWrapper(ctrl.updateById));

router.patch('/:contactId', controllerWrapper(ctrl.updateFavorite));

router.delete('/:contactId', controllerWrapper(ctrl.removeById));

module.exports = router
