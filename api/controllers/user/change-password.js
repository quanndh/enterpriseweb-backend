module.exports = {


  friendlyName: 'Change password',


  description: '',


  inputs: {
    newPassword: { type: "string" },
    confirmPassword: { type: "string" }
  },


  exits: {
    success: { statusCode: 200 },
    fail: { statusCode: 400 }
  },


  fn: async function (inputs, exits) {

    try {
      let { newPassword, confirmPassword } = inputs;
      if (!newPassword || !confirmPassword) return exits.fail({
        code: 1,
        message: "Please enter a new password and confirm"
      })
      if (newPassword !== confirmPassword) return exits.fail({
        code: 2,
        message: "Confirm password does not match"
      })
      newPassword = sails.helpers.password.hash(newPassword)

      let updatedUser = await User.updateOne(this.req.user.id).set({
        password: newPassword
      })

      delete updatedUser.password

      await ActionLog.create({ owner: this.req.user.id, action: 'Change password' })
      return exits.success({
        code: 0,
        message: 'Password changed successfully',
        data: updatedUser
      })

    } catch (error) {
      return exits.fail({
        code: 500,
        message: 'System encounterd a error. Try again later',
        error
      })
    }

  }


};
