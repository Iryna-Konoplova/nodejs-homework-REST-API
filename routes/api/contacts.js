const express = require('express')
const router = express.Router()
const { NotFound, BadRequest } = require('http-errors')
const { joiSchema } = require('../../models/contact')

const { Contact } = require('../../models');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await Contact.findOne({ _id: contactId });
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
    const result = await Contact.create(req.body);
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
    const contact = await Contact.findByIdAndRemove({ _id: contactId });
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
    const result = await Contact.findByIdAndUpdate({ _id: contactId }, req.body, { new: true });
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

router.patch('/:contactId/favorite', async (req, res, next) => {
  if (req.body.favorite === undefined) {
    res.status(400).json({
      status: 'error',
      code: 404,
      message: 'missing field favorite'
    })
    return
  }
  const { contactId } = req.params
  const result = await Contact.findByIdAndUpdate({ _id: contactId }, { ...req.body }, { new: true })
  if (!result) {
    res.status(404).json({
      status: 'error',
      code: 404,
      message: `Contact with id ${contactId} not found`
    })
    return
  }
  res.json({
    status: 'successfuly updated',
    code: 202
  })
})

module.exports = router
