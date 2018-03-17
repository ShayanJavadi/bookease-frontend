const Chance = require("chance")
const sendSms = require("../lib/sendSms")

module.exports = ({ firebase, config, event: { params: { phoneNumber } } }) => {
  const chance = new Chance()
  const verificationCode = chance.string({
    length: 6,
    pool: "0123456789",
  })

  return firebase.database().ref(`/usersByPhoneNumber/${phoneNumber}`).set({
    verificationCode,
    updatedAt: Date.now()
  })
  .then(() => {
    const body = `${verificationCode} is your ${config.APP_NAME} verification code`
    const to = phoneNumber

    return sendSms({
      body,
      to,
      config
    })
  })
}
