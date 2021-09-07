const express = require('express')
const router = express.Router()
const BillController = require('../controllers/bills')
const upload = require('../middleware/upload')
const passport = require('passport')
require('../config/passport')(passport)

router.get(
  '/getBills',
  passport.authenticate('admin_strategy', { session: false }),
  BillController.getBills,
)
router.get(
  '/getClientBills',
  passport.authenticate('client_strategy', { session: false }),
  BillController.getClientBills,
)
router.get('/getBill/:id', BillController.getBill)
router.post(
  '/addBill',
  passport.authenticate('admin_strategy', { session: false }),
  upload.single('image'),
  BillController.addBill,
)
router.put('/updateBill/:id', upload.single('image'), BillController.updateBill)
router.delete('/removeBill/:id', BillController.removeBill)

module.exports = router
