const express = require('express');

const { controllerWrapper, validation } = require('../../middlewares');
// const { joiSchema } = require('../../models/user');
const { auth: ctrl } = require('../../controllers');

const router = express.Router();

router.post('/register', controllerWrapper(ctrl.register));

router.post('/login', controllerWrapper(ctrl.login));

router.get('/logout', controllerWrapper(ctrl.logout));

module.exports = router;
