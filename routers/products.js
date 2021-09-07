const express = require('express')
const router = express.Router()
const ProductController = require('../controllers/products')
const passport = require('passport')
require('../config/passport')(passport)

router.get(
  '/getProducts',
  passport.authenticate('admin_strategy', { session: false }),
  ProductController.getProducts,
)
router.get(
  '/getClientProducts',
  passport.authenticate('client_strategy', { session: false }),
  ProductController.getProducts,
)
router.get('/getProduct/:id', ProductController.getProduct)
router.post(
  '/addProduct',
  passport.authenticate('admin_strategy', { session: false }),
  ProductController.addProduct,
)
router.put('/updateProduct/:id', ProductController.updateProduct)
router.delete('/removeProduct/:id', ProductController.removeProduct)
router.put('/addUserToProduct/:id', ProductController.addUserToProduct)

module.exports = router
