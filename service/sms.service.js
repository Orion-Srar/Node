const twilio = require('twilio');

const {TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SEND_SERVICE} = require("../config/config");


const client = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

const sendSms = async (message, phone) => {
    try {
        console.log(`SMS start. ${message}`)

        const smsResp = await client.messages.create({
            body: message,
            messagingServiceSid: TWILIO_SEND_SERVICE,
            to: phone
        })
        console.log(`SMS res. ${smsResp.status}`)
    }catch (e) {
        console.error(`SMS service: ${e.message}`);
    }
};

module.exports = {
    sendSms,
}