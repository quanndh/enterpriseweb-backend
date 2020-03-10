module.exports = {


  friendlyName: 'Login',


  description: 'Login user.',


  inputs: {
    email: { type: 'string', isEmail: true },
    password: { type: 'string' }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { email, password } = inputs
      if (!email || !password) return exits.fail({
        code: 1,
        message: ''
      })
      let user = await User.findOne({ email })
      if (!user) return exits.fail({
        code: 2,
        message: 'Not enough information'
      })

      if (!sails.helpers.password.check.with({
        password,
        hashPassword: user.password
      })) return exits.fail({
        code: 2,
        message: 'Invalid credentials'
      })

      delete user.password;
      let token = sails.helpers.jwt.sign(user)
      return exits.success({
        code: 0,
        data: user,
        token
      })

    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
