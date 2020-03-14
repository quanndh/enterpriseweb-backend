const path = require('path');
const fs = require('fs');

function moveFile(oldPath, newPath) {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        // console.log('reject');
        return reject(err);
      }
      // console.log('resolve');

      return resolve();
    });
  });
}

module.exports = {


  friendlyName: 'Upload image',

  files: ['files'],

  description: '',


  inputs: {
    files: {
      type: 'ref',
      required: true
    },
    employeeId: {
      type: 'number'
    }
  },

  exits: {
    fail: {
      statusCode: 400
    },
    serverError: {
      statusCode: 500
    }
  },


  fn: async function (inputs, exits) {
    try {
      let info = await sails.upload(inputs.files);
      if (info.length === 0) {
        return exits.fail({
          code: 1,
          message: 'Không có file được upload!',
        });
      }
      let findEmployee = await Employee.findOne({id: inputs.employeeId});
      if (!findEmployee) {
        return exits.fail({
          code: 1,
          message: 'Không tìm thấy nhân viên!'
        })
      }
      let fileUploadTmp = {
        fileName: '',
        serverFileDir: '',
        serverFileName: '',
        fileType: '',
        size: '',
        status: '',
        field: '',
      };
      let filesCreate = [];
      let filesNotCreate = [];

      for (let i = 0; i < info.length; i++) {
        const v = info[i];
        let tmp = Object.assign({}, fileUploadTmp);
        tmp.fileName = v.filename;
        tmp.serverFileName = path.basename(v.fd);
        tmp.serverFileDir = 'other';
        tmp.size = v.size;
        tmp.fileType = v.type;
        tmp.status = v.status;
        tmp.field = v.field;
        tmp.employee = inputs.employeeId;
        try {
          await moveFile(v.fd, FileUpload.getFilePath(tmp));
          filesCreate.push(tmp);
        } catch (error) {
          fs.unlinkSync(v.fd);
          filesNotCreate.push({
            filename: v.filename,
            error: String(error)
          });
        }
      }
      let created = await FileUpload.createEach(filesCreate).fetch();

      return exits.success({
        code: 0,
        data: created,
        notCreate: filesNotCreate
      });
    } catch (error) {
      return exits.serverError({
        code: 1,
        err: error,
        message: 'Hệ thống gặp vấn đề, quay lại sau!'
      })
    }

  }


};
