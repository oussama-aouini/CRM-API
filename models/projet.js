const mongoose = require('mongoose')

const Projet = mongoose.model(
  'Projet',
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    description: {
      type: String,
      required: true,
    },
    comments: {
      currentTask: {
        type: String,
        default: 'project at the start',
      },
      percentage: {
        type: Number,
        default: 0,
      },
    },
    category: {
      type: String,
      enum: ['web', 'mobile'],
    },
    price: {
      type: Number,
    },
    responsable: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Admin',
    },
    client: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Client',
    },
    status: {
      type: String,
      enum: ['on hold', 'accepted', 'pending..'],
      default: 'pending..',
    },
    submissionDate: {
      type: Date,
      default: Date.now,
    },
    active: {
      type: Boolean,
      default: true,
    },
    bills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
      },
    ],
    invoices: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bill',
      },
    ],
  }),
)

module.exports = Projet
