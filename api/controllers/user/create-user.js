module.exports = {


  friendlyName: 'Create class',


  description: '',


  inputs: {
    email: { type: 'string' },
    fullName: { type: 'string' },
    role: { type: 'number' },
    phone: { type: 'string' },
    birthYear: { type: "number" }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { email, fullName, role, phone, birthYear } = inputs;

      if (!email || !fullName || !role) return exits.fail({
        code: 1,
        message: 'Not enough information'
      })

      let user = await User.findOne({ email })
      if (user) return exits.fail({
        code: 2,
        message: "This email is taken"
      })

      let password = "123456";
      password = sails.helpers.password.hash(password)

      let newUser = {
        email,
        fullName,
        role,
        password,
        phone,
        birthYear
      }

      let createdUser = await User.create(newUser).fetch()
      delete createdUser.password
      await ActionLog.create({ owner: this.req.user.id, action: 'Create new user', role: this.req.user.role })

      let url = `http://localhost:3000`

      let data = {
        email: email,
        subject: "Welcome to our system",
        content: `
          <p>Dear ${createdUser.fullName},</p>
          <p>We very glad that you become a part of our system. Please use the following link to start your education journey!!!</p>
          <p>Use your email with the password <strong>123456</strong> to login. Remember to change your password later!!!</p>
          <p><a href="${url}">${url}</a></p>
         `
      }

      await sails.helpers.common.sendMail(data)

      return exits.success({
        code: 0,
        message: 'New user created',
        data: createdUser
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
