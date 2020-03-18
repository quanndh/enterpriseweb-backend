/**
 * Blog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    content: { type: 'string' },
    comment: {
      type: 'json', defaultsTo: []
    },
    file: { type: 'json', defaultsTo: [] },
    image: { type: 'json', defaultsTo: [] },
    owner: { model: 'User' },
    class: { model: 'Class' }
  },

};

