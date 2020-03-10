/**
 * Blog.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    title: { type: 'string' },
    content: { type: 'string' },
    comment: {
      collection: 'Comment',
      via: 'blogId'
    }

  },

};

