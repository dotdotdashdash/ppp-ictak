const mongoose = require("mongoose")

const Schema =  mongoose.Schema;

var invoiceSchema = new Schema({
  partnerName: String,
  partnerEmail: String,
  workOrderNumber: String,
  workOrderId: String,
  invoiceNumber: String,
  invoiceType: Boolean,
  invoiceId: String,
  adminApproved: Boolean,
  paid: Boolean,
  fileName: String,
  totalAmount: String,
  invoiceDate: Date,
  sessionDate: Date,
  invoiceDueDate: Date,
  paymentDate: Date
});


module.exports = mongoose.model('invoice', invoiceSchema)