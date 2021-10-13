const { NotFound } = require('http-errors')
const { Contact } = require('../models');

// const getAll = async (req, res, next) => {
//   const contacts = await Contact.find();
//   res.json(contacts);
// };

const getAll = async (req, res) => {
  const result = await Contact.find({}, '_id name email phone favorite');
  res.json({
    status: 'success',
    code: 200,
    data: { result }
  });
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  // const result = await Contact.findOne({ _id: contactId });
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
  const result = await Contact.create(req.body);
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
