const jwt = require('jsonwebtoken')
module.exports = {


  friendlyName: 'Sign',


  description: 'Sign jwt.',


  inputs: {
    user: { type: 'ref', required: true }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,
  fn: function (inputs) {
    let { user } = inputs;
    return jwt.sign({ ...user }, "ahihisescret", { expiresIn: '30m' })
  }


};

