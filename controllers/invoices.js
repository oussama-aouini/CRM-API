const Invoice = require('../models/invoice')
const _ = require('lodash')

exports.getInvoices = async (req, res) => {
  const id = req.user._id
  const invoices = await Invoice.find({ responsable: id })
    .populate('client')
    .populate('responsable')
  res.send(invoices)
}
exports.getClientInvoices = async (req, res) => {
  const id = req.user._id
  const invoices = await Invoice.find({ client: id })
    .populate('client')
    .populate('responsable')
  res.send(invoices)
}
exports.getInvoice = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)
    .populate('client')
    .populate('responsable')
  if (!invoice) return res.status(404).send('invoice not found...')
  res.send(invoice)
}

exports.addInvoice = async (req, res) => {
  const responsableId = req.user._id
  let invoice = new Invoice({
    client: req.body.client,
    responsable: responsableId,
    items: {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    },
    paid: req.body.paid,
    status: req.body.status,
    deadline: req.body.deadline,
    image: {
      title: req.body.title,
      src: req.file ? req.file.path : null,
    },
  })
  invoice = await invoice.save()
  res.send(invoice)
}

exports.updateInvoice = async (req, res) => {
  const invoice = await Invoice.findById(req.params.id)
  if (!invoice) return res.status(404).send('invoice not found...')
  invoice.set({
    client: req.body.client,
    responsable: req.body.responsable,
    items: {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
    },
    paid: req.body.paid,
    status: req.body.status,
    deadline: req.body.deadline,
    image: {
      title: req.body.title,
      src: req.file ? req.file.path : invoice.image.src,
    },
  })
  const result = await invoice.save()
  res.send(result)
}

exports.removeInvoice = async (req, res) => {
  const result = await Invoice.deleteOne({ _id: req.params.id })
  if (!result) return res.status(404).send("This invoice doesn't exist...")
  res.send(result)
}
