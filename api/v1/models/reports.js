const mongoose = require('mongoose')
const ReportSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    sendTo: [{
        name: String,
        email: String
    }],
    subject: String,
    template: String,
    link: String,
    templateOptions: mongoose.Schema.Types.Mixed
}, { timestamp: true })
module.exports = mongoose.model('reports', ReportSchema)