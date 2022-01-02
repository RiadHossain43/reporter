const ejs = require('ejs')
const path = require('path')
const { asynchronously } = require('./utils')
const createTemplate = async (builder) => {
    const [error, template] = await asynchronously(ejs.renderFile(
        path.join(__dirname + `/../assets/templates/${builder.view}`),
        builder.templateOptions || {}
    ))
    if (error) return process.env.FAIL_EMAIL
    return template
}
exports.emails = {
    imsChangeLogs: {
        subject: "iMS Systems changelogs",
        template: templateOptions => createTemplate({
            view: 'iMSChangeLogs.ejs',
            templateOptions
        })
    },
    helloWorld: {
        subject: "Email API testing.",
        template: templateOptions => createTemplate({
            view: 'helloWorld.ejs',
            templateOptions
        })
    }
}