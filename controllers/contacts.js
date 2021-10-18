const { NotFound } = require('http-errors')
const { Contact } = require('../models');

const getAll = async (req, res) => {
  const { page = 1, limit = 20 } = req.query;
  const skip = (page - 1) * limit;
  const { _id } = req.user;
  const result = await Contact.find({ owner: _id }, '_id name email phone favorite', { skip, limit: +limit }).populate('owner', 'email');
  res.json({
    status: 'success',
    code: 200,
    data: { result }
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId, '_id name email phone favorite');
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result }
  });
};

const add = async (req, res) => {
  const newContact = { ...req.body, owner: req.user._id }
  const result = await Contact.create(newContact);
  res.status(201).json({
    status: 'success',
    code: 201,
    data: { result }
  });
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true });
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result }
  });
};

const updateFavorite = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body
  const result = await Contact.findByIdAndUpdate(contactId, { favorite }, { new: true });
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`)
  }
  res.json({
    status: 'success',
    code: 200,
    data: { result }
  });
};

const removeById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findByIdAndDelete(contactId);
  if (!result) {
    throw new NotFound(`Product with id=${contactId} not found`);
  }
  res.json({
    status: 'success',
    code: 200,
    message: 'Success delete'
  });
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  updateFavorite,
  removeById
};
