const Twilio = require("twilio")

let client

module.exports = ({ TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN }) => {
  if( !client ){
    client = new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
  }
  return client
}
