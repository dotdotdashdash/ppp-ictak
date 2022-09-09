const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var TrainingRequestSchema = new Schema({
  adminApproved: Boolean,
  financeApproved: Boolean,
  assignedBy: String,
  trainingDetails: { 
    topic: String,
    partnerId: String,
    partnerName: String,
    partnerEmail: String
  },
  partnerDetails: {
    partnerId: String,
    partnerName: String,
    partnerEmail: String,
    partnerGst: String,
    partnerAddress: String
  },
  sessionDetails: {
    mode: String,
    venue: String,
    hourlyPayment: Number,
    startTime: Date,
    endTime: Date
  },
  paymentDetails: {
    durationHrs: Number,
    totalAmount: Number,
    includingGst: Boolean,
    includingTds: Boolean
  },
  workOrderDetails : {
    fileName: String,
    generatedDate: Date,
    workOrderNumber: {
      type: String,
      unique: true,
      index: true,
      sparse: true
    }
  }
}, { timestamps: true });

var WorkOrderCounterSchema = new Schema({
  year: Number,
  month: Number,
  count: Number
});

var trainingRequest = mongoose.model('TrainingRequest', TrainingRequestSchema);
var workOrderCounter = mongoose.model('WorkOrderCounter', WorkOrderCounterSchema);

module.exports = { 
  TrainingRequest: trainingRequest, 
  WorkOrderCounter: workOrderCounter 
};