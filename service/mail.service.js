const nodemailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const {NO_REPLY_EMAIL, NO_REPLY_EMAIL_PASSWORD} = require('../config/config');
const emailTemplate = require('../email-templates');
const ApiError = require("../error/apiError");

const sendEmail = async (receiverEmail, emailAction) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: NO_REPLY_EMAIL,
            pass:  NO_REPLY_EMAIL_PASSWORD,
        }
    });

    const templateInfo = emailTemplate[emailAction];

    if (!templateInfo) {
        throw new ApiError('Wrong template', 500);
    }

    const templateRenderer = new EmailTemplates({
        views: {
            root: path.join(process.cwd(), 'email-templates')
        }
    });

    const html = await templateRenderer.render(templateInfo.templateName);


    return transporter.sendMail({
        from: 'No reply',
        to: receiverEmail,
        subject: templateInfo.subject,
        html
    })
}

module.exports = {
    sendEmail
}