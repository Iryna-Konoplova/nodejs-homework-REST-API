const express = require('express');

const { controllerWrapper, authenticate, upload } = require('../../middlewares');

const { auth: ctrl } = require('../../controllers');

const router = express.Router();

router.patch('/avatars', authenticate, upload.single('avatar'), controllerWrapper(ctrl.updateAvatar))

module.exports = router;
