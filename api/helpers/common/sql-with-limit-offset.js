module.exports = {


  friendlyName: 'Sql with limit offset',


  description: '',


  inputs: {
    data: {
      type: 'ref'
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs) {
    let {data} = inputs;
    if (data.limit) {
      data.sql += ` limit ${data.limit} `;
    }
    if (data.skip) {
      if (!data.limit) {
        data.sql += ` limit 100`;
      }
      data.sql += ` offset ${data.skip} `;
    }
    return data.sql;
  }


};

