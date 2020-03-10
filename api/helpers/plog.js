const winston = require('winston');
require('winston-daily-rotate-file');
const shortid = require('shortid');
const moment = require('moment');
var logger = new winston.Logger();

let queue = {};
module.exports = {


  friendlyName: 'Plog',


  description: 'Plog something.',


  inputs: {
    key: { type: 'string' },
    type: { type: 'number', description: '1. start, 2. end' },
    content: { type: 'string' }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },
  sync: true,

  fn: function (inputs) {
    // return {};
    let { key, type, content } = inputs;
    if (type === 1) { //start log
      key = shortid.generate();
      let input = {
        key,
        start: new Date().getTime(),
        content
      }
      queue[key] = input;
      logger.info(`[START] [${key}] [${moment(input.start).format('YYYY/MM/DD HH:mm:ss')}] [${content}]`);
      return input;
    } else {
      //done log
      let input = queue[key];
      let dur = new Date().getTime() - queue[key].start;
      if (dur < 1000) {
        logger.info(`[END] [${key}] [U1] [${dur}] [${content}]`);
      } else if (dur < 3000) {
        logger.info(`[END] [${key}] [U3] [${dur}] [${content}]`);
      } else if (dur < 5000) {
        logger.info(`[END] [${key}] [U5] [${dur}] [${content}]`);
      } else if (dur < 10000) {
        logger.info(`[END] [${key}] [U10] [${dur}] [${content}]`);
      } else {
        logger.info(`[END] [${key}] [O10] [${dur}] [${content}]`);
      }
      delete queue[key];
    }
  }
};

