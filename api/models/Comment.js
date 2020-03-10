/**
 * Comment.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    owner: { model: 'User' },
    content: { type: 'string' },
    blogId: { model: 'Blog' }

  },

};

