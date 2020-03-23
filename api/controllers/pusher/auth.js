const pusher = require('pusher-js');
module.exports = {


  friendlyName: 'Auth',


  description: 'Auth pusher.',


  inputs: {

  },


  exits: {

  },


  fn: async function (inputs) {

    let req = this.req;
    let res = this.res;
    var socketId = req.body.socket_id;
    var channel = req.body.channel_name;
    let userId = req.body.userId;

    let userInfo = await User.findOne(userId)
    delete userInfo.password;

    let pusher = new Pusher({
      appId: '967754',
      key: 'de206cb50d3197dcb0ba',
      secret: 'eaa31bb117b0550c12d4',
      cluster: 'ap1',
      encrypted: true
    });
    var presenceData = {
      user_id: userInfo.id,
      user_info: userInfo
    };
    var auth = pusher.authenticate(socketId, channel, presenceData);
    res.send(auth);

  }


};
