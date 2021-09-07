const Reclamation = require('../models/reclamation')

exports.getAllReclamations = async (req, res) => {
  await Reclamation.find()
    .populate('responsable')
    .populate('client')
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ erreur: err })
    })
}

exports.getReclamations = async (req, res) => {
  const id = req.user._id

  await Reclamation.find({ responsable: id })
    .populate('responsable')
    .populate('client')
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ erreur: err })
    })
}
exports.getClientReclamations = async (req, res) => {
  const id = req.user._id

  await Reclamation.find({ client: id })
    .populate('responsable')
    .populate('client')
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ erreur: err })
    })
}
exports.getReclamation = async (req, res) => {
  await Reclamation.findById(req.params.id)
    .populate('responsable')
    .populate('client')
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "reclamation n'a pas été trouvé",
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({ erreur: err })
    })
}

exports.getReclamationsByAdminId = async (req, res) => {
  await Reclamation.find({ responsable: req.params.adminId })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "reclamation n'a pas été trouvé",
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({ erreur: err })
    })
}

exports.addReclamation = async (req, res) => {
  const clientId = req.user._id
  const { object, type, category, context, status, responsableId } = req.body
  const reclamation = new Reclamation({
    object: object,
    type: type,
    category: category,
    context: context,
    status: status,
    responsable: responsableId,
    client: clientId,
    snapshots: {
      title: req.file ? req.file.filename : null,
      src: req.file ? req.file.path : null,
    },
  })

  await reclamation
    .save()
    .then((data) => {
      res.json({ sucess: 'Reclamation ajouté', data: data })
    })
    .catch((err) => {
      res.status(500).send({
        erreur: err,
      })
    })
}

exports.updateReclamation = async (req, res) => {
  const {
    object,
    type,
    category,
    context,
    status,
    responsableId,
    clientId,
  } = req.body
  const reclamation = await Reclamation.findById(req.params.id)
  if (!reclamation) {
    res.status(404).send({
      message: "Reclamation n'a pas été trouvé",
    })
  }
  reclamation.set({
    object: object ? object : reclamation.object,
    type: type ? type : reclamation.type,
    category: category ? category : reclamation.category,
    context: context ? context : reclamation.context,
    status: status ? status : reclamation.status,
    responsable: responsableId ? responsableId : reclamation.responsableId,
    client: clientId ? clientId : reclamation.clientId,
    snapshots: req.file
      ? {
        title: req.file ? req.file.filename : null,
        src: req.file ? req.file.path : null,
      }
      : { ...reclamation.snapshots },
  })
  reclamation
    .save()
    .then((data) => {
      res.json({ sucess: 'reclamation modifié', data: data })
    })
    .catch((err) => {
      res.status(500).send({
        erreur: err,
      })
    })
}

exports.deactivateReclamation = async (req, res) => {
  Reclamation.findByIdAndUpdate(req.params.id, { active: false }, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Reclamation n'a pas été trouvé",
        })
      } else {
        res.send({
          message: 'Reclamation désactivé',
          data: data,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        erreur: err,
      })
    })
}
