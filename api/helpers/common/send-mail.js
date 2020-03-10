const moment = require('moment');
const nodemailer = require('nodemailer')

module.exports = {


  friendlyName: 'Send mail',


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


  fn: async function (inputs, exits) {
    try {
      let { data } = inputs;

      let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        debug: true,
        auth: {
          user: "quanndh1810@gmail.com",
          pass: "quannguyen123"
        },
        ignoreTLS: true
      });

      let url = `localhost:3000/class/${data.classId}`

      await transporter.sendMail({
        from: 'quanndh1810@gmail.com',
        to: data.email,
        subject: "Class Assign",
        text: `Inform about your class status`,
        html: `
          <div>
            <p>Dear mister/miss,</p> <br></br>
            <p>We want to inform that, you are assigned to class ${data.class}</p> <br></br>
            <p>Link to your class: <a href="${url}">${url}</a></p>
          </div>
        `
      });

      // await SendMailLog.create({ data: data });

      return exits.success()


    } catch (error) {
      await SendMailLog.create({ to: data.to, subject: data.subject, content: data.content, error: error.message });
    }
  }


};

