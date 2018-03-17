const sms = require("./smsClient")
module.exports = ({ config: { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_PHONE_NUMBER }, to, body }) => {
  return sms({ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN }).messages.create(Object.assign({ from: TWILIO_PHONE_NUMBER }, { to, body }))
}
