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
