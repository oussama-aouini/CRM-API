const Projet = require('../models/projet')

exports.getAllProjets = async (req, res) => {
  await Projet.find()
    .populate('responsable')
    .populate('client')
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({ erreur: err })
    })
}
exports.getProjets = async (req, res) => {
  const id = req.user._id
  await Projet.find({ responsable: id })
    .populate('responsable')
    .populate('client')
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Projets n'ont pas été trouvé",
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({ erreur: err })
    })
}
exports.getClientProjets = async (req, res) => {
  const id = req.user._id
  await Projet.find({ client: id })
    .populate('responsable')
    .populate('client')
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Projets n'ont pas été trouvé",
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({ erreur: err })
    })
}

exports.getProjet = async (req, res) => {
  await Projet.findById(req.params.id)
    .populate('responsable')
    .populate('client')
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Projet n'a pas été trouvé",
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({ erreur: err })
    })
}

exports.getProjetsByAdminId = async (req, res) => {
  await Projet.find({ responsable: req.params.adminId })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Projet n'a pas été trouvé",
        })
      } else {
        res.send(data)
      }
    })
    .catch((err) => {
      res.status(500).send({ erreur: err })
    })
}
exports.addProjet = async (req, res) => {
  const responsableId = req.user._id
  const { title, description, category, price, clientId, status } = req.body
  const projet = new Projet({
    title: title,
    description: description,
    category: category,
    price: price,
    responsable: responsableId,
    client: clientId,
    status: status,
  })

  await projet
    .save()
    .then((data) => {
      res.json({ sucess: 'projet ajouté', data: data })
    })
    .catch((err) => {
      res.status(500).send({
        erreur: err,
      })
    })
}

exports.updateProjet = async (req, res) => {
  const {
    title,
    description,
    currentTask,
    percentage,
    category,
    price,
    responsableId,
    clientId,
    status,
    billId,
    invoiceId,
  } = req.body
  const projet = await Projet.findById(req.params.id)
  if (!projet) {
    res.status(404).send({
      message: "Projet n'a pas été trouvé",
    })
  }
  projet.set({
    title: title ? title : projet.title,
    description: description ? description : projet.description,
    comments: {
      currentTask: currentTask ? currentTask : projet.comments.currentTask,
      percentage: percentage ? percentage : projet.comments.percentage,
    },
    category: category ? category : projet.category,
    price: price ? price : projet.price,
    responsable: responsableId ? responsableId : projet.responsableId,
    client: clientId ? clientId : projet.clientId,
    status: status ? status : projet.status,
    bills: billId ? [...projet.bills, billId] : [...projet.bills],
    invoices: invoiceId
      ? [...projet.invoices, invoiceId]
      : [...projet.invoices],
  })
  projet
    .save()
    .then((data) => {
      res.json({ sucess: 'projet modifié', data: data })
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({
        erreur: err,
      })
    })
}

exports.deactivateProjet = async (req, res) => {
  Projet.findByIdAndUpdate(req.params.id, { active: false }, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Projet n'a pas été trouvé",
        })
      } else {
        res.send({
          message: 'Projet désactivé',
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
exports.activateProjet = async (req, res) => {
  Projet.findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: "Projet n'a pas été trouvé",
        })
      } else {
        res.send({
          message: 'Projet désactivé',
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
