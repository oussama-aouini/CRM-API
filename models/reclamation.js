const mongoose = require('mongoose')

const Reclamation = mongoose.model(
  'Reclamation',
  new mongoose.Schema({
    object: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    type: {
      type: String,
      enum: ['urgent', 'important'],
    },
    category: {
      type: String,
      enum: ['financial', 'error', 'technical'],
    },
    context: {
      type: String,
    },
    status: {
      type: String,
      enum: ['solved', 'not solved yet'],
      default: 'not solved yet',
    },
    snapshots: {
      title: {
        type: String,
        required: false,
      },
      src: {
        type: String,
        required: false,
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    responsable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
  }),
)

module.exports = Reclamation
