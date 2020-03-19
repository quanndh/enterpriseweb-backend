/**
 * Blog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    content: { type: 'string' },
    file: { type: 'json', defaultsTo: [] },
    image: { type: 'json', defaultsTo: [] },
    owner: { model: 'User' },
    class: { model: 'Class' },
    isDelete: { type: 'number', defaultsTo: 0 }
  },

};

