const mongoose = require("mongoose")

const Schema =  mongoose.Schema;

var remittanceSchema = new Schema({
  partnerName: String,
  workOrderNumber: String,
  workOrderId: String,
  invoiceNumber: String,
  invoiceId: String,
  totalAmount: String,
  transactionId: String,
  paymentMethod: String,
  paymentDate: Date
});


module.exports = mongoose.model('payment', remittanceSchema)