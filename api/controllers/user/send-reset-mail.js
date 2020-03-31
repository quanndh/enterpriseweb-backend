module.exports = {


  friendlyName: 'Send reset mail',


  description: '',


  inputs: {
    email: { type: 'string' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { email } = inputs;
      let userInfo = await User.findOne({ email })
      if (!userInfo) return exits.fail({
        code: 1,
        message: 'Email not found'
      })

      delete userInfo.password;

      let token = sails.helpers.jwt.sign(userInfo)

      let url = `http://localhost:3000/reset/${token}`

      let data = {
        email: email,
        subject: "Reset your password!",
        content: `
          <p>Dear ${userInfo.fullName},</p>
          <p>Please use the following link to reset your password</p>
          <p>Link to reset your password: <a href="${url}">${url}</a></p>
         `
      }
      await sails.helpers.common.sendMail(data)
      return exits.success({
        code: 0,
        message: 'Please check your email.',
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
