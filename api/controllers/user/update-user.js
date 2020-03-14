module.exports = {


  friendlyName: 'Update user',


  description: '',


  inputs: {
    id: { type: 'number' },
    fullName: { type: 'string' },
    email: { type: 'string' },
    birthYear: { type: 'number' },
    phone: { type: 'number' },
    avatar: { type: 'string' }
  },

  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { id, fullName, email, birthYear, phone, avatar } = inputs;
      let user = await User.findOne(id);
      if (!user) return exits.fail({
        code: 404,
        message: 'User not found'
      })
      await User.updateOne(id).set({
        fullName,
        email,
        birthYear,
        phone,
        avatar
      })
      return exits.success({
        code: 0,
        message: "User updated successfully"
      })
    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later'
      })
    }

  }


};
