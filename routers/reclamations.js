const express = require('express')
const ReclamationController = require('../controllers/reclamation')
const router = express.Router()
const upload = require('../middleware/upload')
const passport = require('passport')
require('../config/passport')(passport)
// CRUD Operations
router.get('/getAllReclamations', ReclamationController.getAllReclamations)
router.get(
  '/getReclamations',
  passport.authenticate('admin_strategy', { session: false }),
  ReclamationController.getReclamations,
)
router.get(
  '/getClientReclamations',
  passport.authenticate('client_strategy', { session: false }),
  ReclamationController.getClientReclamations,
)
router.get('/getReclamation/:id', ReclamationController.getReclamation)
router.get(
  '/getReclamations/admin/:adminId',
  ReclamationController.getReclamationsByAdminId,
)
router.post(
  '/addReclamation',
  passport.authenticate('client_strategy', { session: false }),
  upload.single('snapshots'),
  ReclamationController.addReclamation,
)
router.put(
  '/updateReclamation/:id',
  upload.single('snapshots'),
  ReclamationController.updateReclamation,
)
router.put(
  '/deactivateReclamation/:id',
  ReclamationController.deactivateReclamation,
)

module.exports = router
