const express = require('express')
const router = express.Router()
const InvoiceController = require('../controllers/invoices')
const upload = require('../middleware/upload')
const passport = require('passport')
require('../config/passport')(passport)

router.get(
  '/getInvoices',
  passport.authenticate('admin_strategy', { session: false }),
  InvoiceController.getInvoices,
)
router.get(
  '/getClientInvoices',
  passport.authenticate('client_strategy', { session: false }),
  InvoiceController.getClientInvoices,
)
router.get('/getInvoice/:id', InvoiceController.getInvoice)
router.post(
  '/addInvoice',
  passport.authenticate('admin_strategy', { session: false }),
  upload.single('image'),
  InvoiceController.addInvoice,
)
router.put(
  '/updateInvoice/:id',
  upload.single('image'),
  InvoiceController.updateInvoice,
)
router.delete('/removeInvoice/:id', InvoiceController.removeInvoice)

module.exports = router
