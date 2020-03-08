const nodemailer = require("nodemailer");
const moment = require('moment');
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
      if (!data.email.length || email === "") {
        return exits.success();
      }

      let transporter = nodemailer.createTransport({
        host: "mail.gviet.vn",
        port: 25,
        secure: false,
        auth: {
          user: "kd_report@gviet.vn",
          pass: "uL2JgQPzYRU8qDHZnvfD6Rwc"
        }
      });
      if (data.mailType === "offer") {
        const sectionSelection = ['Công việc', 'Team', 'TTKD', 'Công ty']

        let subject = "V/v đơn đề xuất"
        let html = "";
        if (data.status === 2) {
          html = `<div>
          <p>Dear anh/chị,</p>
          <p>Đơn đề xuất về ${sectionSelection[data.type - 1]} của bạn được đánh giá là phù hợp. Đề xuất của bạn đã được thông qua</p>
          <p>Chi tiết: <strong>${data.note}</strong></p>
        </div>
        `
        } else {
          html = `<div>
            <p>Dear anh/chị,</p>
            <p>Đơn đề xuất về ${sectionSelection[data.type - 1]} của bạn được đánh giá là chưa phù hợp. Đề xuất của bạn đã bị từ chối</p>
            <p>Chi tiết: <strong>${data.note}</strong></p>
          </div>
          `
        }

        let info = await transporter.sendMail({
          from: 'kd_report@gviet.vn',
          to: data.email,
          subject,
          text: `<p>Đơn đề xuất về ${sectionSelection[data.type - 1]} ${data.status === 2 ? 'của bạn đã được duyệt' : 'của bạn đã bị từ chối'}</p>`,
          html
        });

        await SendMailLog.create({ to: data.to, subject: data.subject, content: data.content });

      }
      else if (data.mailType == 'send-request') {
        let subject = `Đơn yêu cầu của nhân viên ${data.fullName}`
        let html = `<div>
        <p>Dear anh/chị,</p>
        <p>Bạn vừa có đơn đề xuất mới từ nhân viên ${data.fullName}</p>
        <p>Chi tiết: link</p>
      </div>
      `
        let info = await transporter.sendMail({
          from: 'kd_report@gviet.vn',
          to: data.email,
          subject,
          text: "",
          html
        });
      }
      else {
        let subject = data.type === 1 ? 'V/v đơn xin nghỉ' : 'V/v đơn xin đến muộn'
        let time = data.type === 1 ? `xin nghỉ từ ngày ${moment(data.startDate).format("DD - MM - YYYY")}, thời gian đi làm lại ${moment(data.endDate).format("DD - MM - YYYY")}` : `xin đến muộn ngày ${moment(data.startDate).format("DD - MM - YYYY")}`
        let html = "";
        if (data.status === 2) {
          html = `<div>
          <p>Dear anh/chị,</p>
          <p>Đơn ${time} của bạn đã được duyệt </p>
          <p>Chi tiết: <strong>${data.note}</strong></p>
        </div>
        `
        } else {
          html = `<div>
          <p>Dear anh/chị,</p>
          <p>Đơn ${time} của bạn đã bị từ chối </p>
          <p>Chi tiết: <strong>${data.note}</strong></p>
        </div>
        `
        }

        let info = await transporter.sendMail({
          from: 'kd_report@gviet.vn',
          to: data.email,
          subject,
          text: data.status === 2 ? `Đơn ${time} của bạn đã được duyệt` : `Đơn ${time} của bạn đã bị từ chối`,
          html
        });

        await SendMailLog.create({ to: data.to, subject: data.subject, content: data.content });
      }

    } catch (error) {
      await SendMailLog.create({ to: data.to, subject: data.subject, content: data.content, error: error.message });
    }
  }


};

