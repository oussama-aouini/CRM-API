const Product = require('../models/product')

exports.getProducts = async (req, res) => {
  const id = req.user._id
  const products = await Product.find({ responsable: id })
    .populate('responsable')
    .populate('users')
  res.send(products)
}

exports.getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
    .populate('responsable')
    .populate('users')
  if (!product) return res.status(404).send('product not found...')
  res.send(product)
}

exports.addProduct = async (req, res) => {
  const responsableId = req.user._id
  let product = new Product({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    sale: req.body.sale,
    recent: req.body.recent,
    discount: req.body.discount,
    responsable: responsableId,
    subscription: {
      type: req.body.type,
      price: req.body.subprice,
      features: req.body.features,
    },
    users: req.body.users,
  })
  product = await product.save()
  res.send(product)
}

exports.updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).send('product not found...')
  product.set({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    sale: req.body.sale,
    new: req.body.new,
    discount: req.body.discount,
    responsable: req.body.responsable,
    subscription: {
      type: req.body.type,
      price: req.body.subprice,
      features: req.body.features,
    },
    users: req.body.users,
  })
  const result = await product.save()
  res.send(result)
}

exports.removeProduct = async (req, res) => {
  const result = await Product.deleteOne({ _id: req.params.id })
  if (!result) return res.status(404).send("This product doesn't exist...")
  res.send(result)
}

exports.addUserToProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).send('product not found...')

  product.users.push(req.body.user)
  const result = await product.save()
  res.send(result)
}
