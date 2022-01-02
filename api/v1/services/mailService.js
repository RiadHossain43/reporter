const nodemailer = require('nodemailer')
const { emails } = require('./emails')
const { asynchronously } = require('./utils')
class MailService {
    constructor() { }
    createTrasporter() {
        return nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SYSTEM_EMAIL,
                pass: process.env.SYSTEM_EMAIL_PASSWORD
            }
        })
    }
    async send(type, receivers, payload) {
        let template = await emails[type].template(payload)
        const mailOptions = {
            from: process.env.SYSTEM_EMAIL,
            to: receivers,
            subject: emails[type].subject,
            html: template,
            attachments: payload.attachments,
        }
        const [error, response] = await asynchronously(this.createTrasporter().sendMail(mailOptions))
        if (!error) console.log(`Email was sent successfully to ${JSON.stringify(receivers)}`)
        return [error, response]
    }
}
exports.MailService = MailService