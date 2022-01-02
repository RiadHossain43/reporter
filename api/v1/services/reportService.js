const { asynchronously } = require('./utils')
const Report = require('../models/reports')
const { MailService } = require('./mailService')
class ReportService {
    constructor() { }
    async createReport(data) {
        return asynchronously(
            Report.create({
                name: data.name,
                sendTo: data.sendTo,
                subject: data.subject,
                template: data.template,
                link: data.link,
                templateOptions: data.templateOptions
            })
        )
    }
    async updateReport(query, data) {
        return asynchronously(
            Report.findOneAndUpdate(query, {
                $set: { sendTo: data.sendTo, link: data.link, templateOptions: data.templateOptions }
            }, { new: true })
        )
    }
    async sendReport(data) {
        let [reportError, newReport] = await asynchronously(Report.findOne({ name: data.name }))
        let email = new MailService()
        if (newReport) {
            let [emailError] = await asynchronously(email.send(newReport.template, newReport.sendTo.map(person => person.email), {
                ...newReport.templateOptions, link: newReport.link
            }))
            if (emailError) return [{ message: 'Email send failed.' }, null]
        }
        return [reportError, newReport]
    }
}
exports.ReportService = ReportService