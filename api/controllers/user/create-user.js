module.exports = {


  friendlyName: 'Create class',


  description: '',


  inputs: {
    email: { type: 'string' },
    fullName: { type: 'string' },
    role: { type: 'number' },

  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { email, fullName, role } = inputs;

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
        role: role === 1 ? 1 : 2,
        isHigher: role === 2 ? 1 : 0,
        password
      }

      await User.create(newUser)
      return exits.success({
        code: 0,
        message: 'New user created'
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
