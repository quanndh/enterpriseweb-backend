const bcrypt = require('bcryptjs');
module.exports = {


  friendlyName: 'Hash',


  description: 'Hash password.',


  inputs: {
    password: { type: 'string', required: true },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },

  sync: true,
  fn: function (inputs) {
    return bcrypt.hashSync(inputs.password, 12)
  }


};

