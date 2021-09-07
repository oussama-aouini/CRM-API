const Bill = require('../models/bill')

exports.getBills = async (req, res) => {
  const id = req.user._id
  const bill = await Bill.find({ responsable: id }).populate('client').populate('responsable')
  res.send(bill)
}
exports.getClientBills = async (req, res) => {
  const id = req.user._id
  const bill = await Bill.find({ client: id }).populate('client').populate('responsable')
  res.send(bill)
}
exports.getBill = async (req, res) => {
  const bill = await Bill.findById(req.params.id)
    .populate('client')
    .populate('responsable')
  if (!bill) return res.status(404).send('bill not found...')
  res.send(bill)
}

exports.addBill = async (req, res) => {
  const responsableId = req.user._id
  let bill = new Bill({
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
  bill = await bill.save()
  res.send(bill)
}

exports.updateBill = async (req, res) => {
  const bill = await Bill.findById(req.params.id)
  if (!bill) return res.status(404).send('bill not found...')
  bill.set({
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
      src: req.file ? req.file.path : bill.image.src,
    },
  })
  const result = await bill.save()
  res.send(result)
}

exports.removeBill = async (req, res) => {
  const result = await Bill.deleteOne({ _id: req.params.id })
  if (!result) return res.status(404).send("This bill doesn't exist...")
  res.send(result)
}
