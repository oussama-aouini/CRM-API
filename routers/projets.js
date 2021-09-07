const express = require('express')
const ProjetController = require('../controllers/projet')
const router = express.Router()
const passport = require('passport')
require('../config/passport')(passport)
// CRUD Operations
router.get('/getAllProjets', ProjetController.getAllProjets)
router.get(
  '/getProjets',
  passport.authenticate('admin_strategy', { session: false }),
  ProjetController.getProjets,
)
router.get(
  '/getClientProjets',
  passport.authenticate('client_strategy', { session: false }),
  ProjetController.getClientProjets,
)
router.get('/getProjets/admin/:adminId', ProjetController.getProjetsByAdminId)
router.post(
  '/addProjet',
  passport.authenticate('admin_strategy', { session: false }),
  ProjetController.addProjet,
)
router.put('/updateProjet/:id', ProjetController.updateProjet)
router.put('/deactivateProjet/:id', ProjetController.deactivateProjet)
router.put('/activateProjet/:id', ProjetController.activateProjet)

module.exports = router
