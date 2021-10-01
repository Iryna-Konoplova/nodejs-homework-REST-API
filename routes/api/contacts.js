const express = require('express')
const router = express.Router()
const { NotFound, BadRequest } = require('http-errors')
const Joi = require('joi');

const {
  listContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContact
} = require('../../model/index');

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const result = await addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: { result }
    });
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'Success delete'
    });
  } catch (error) {
    next(error);
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { contactId } = req.params;
    const result = await updateContactById(contactId, req.body);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      data: { result }
    });
  } catch (error) {
    next(error);
  }
})

module.exports = router
