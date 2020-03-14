const sharp = require('sharp');
const path = require('path');
const fs = require('fs');
module.exports = {


  friendlyName: 'Upload image',

  files: ['images'],

  description: '',


  inputs: {
    images: {
      type: 'ref',
      required: true
    },
    width: {
      type: 'number',
      min: 1
    },
    height: {
      type: 'number',
      min: 1
    },
    isToJPG: {
      type: 'boolean',
      defaultsTo: false
    },
  },


  exits: {
    success: {
      statusCode: 200
    },
    fail: {
      statusCode: 400
    },
    serverError: {
      statusCode: 500
    }
  },


  fn: async function (inputs, exits) {
    try {
      let w = inputs.width;
      let h = inputs.height;
      let info = await sails.upload(inputs.images);
      if (info.length === 0) {
        return res.badRequest({
          message: sails.__('Không có file được upload!'),
        });
      }

      let fileUploadTmp = {
        fileName: '',
        serverFileDir: '',
        serverFileName: '',
        fileType: '',
        size: '',
        status: '',
        field: ''
      };

      let filesCreate = [];
      let filesNotCreate = [];

      for (let i = 0; i < info.length; i++) {
        const v = info[i];
        let tmp = Object.assign({}, fileUploadTmp);
        tmp.fileName = v.filename;
        tmp.serverFileName = path.basename(v.fd);
        tmp.serverFileDir = 'images';
        tmp.size = v.size;
        tmp.fileType = v.type;
        tmp.status = v.status;
        tmp.field = v.field;
        if (FileUpload.isImage(tmp)) {
          let tempPromise = sharp(v.fd);
          if (w && h) {
            w = Number(w);
            h = Number(h);
            tempPromise.resize(w, h);
          }
          if (inputs.isToJPG) {
            var replaceExt = require('replace-ext');
            tmp.serverFileName = replaceExt(tmp.serverFileName, '.jpg');
            tmp.fileName = replaceExt(tmp.fileName, '.jpg');
            tmp.fileType = 'image/jpeg';
            tempPromise.toFormat('jpeg');
          }
          await tempPromise.toFile(path.join(FileUpload.dir[tmp.serverFileDir], tmp.serverFileName));
          filesCreate.push(tmp);
        } else {
          let notCreate = {
            fileName: tmp.fileName,
            error: 'File không phải định dạng hình ảnh'
          };
          filesNotCreate.push(notCreate);
          return this.res.send({
            code: 1,
            message: 'File không phải dạng hình ảnh!',
            notCreate: filesNotCreate
          })
        }
        fs.unlinkSync(v.fd);
      }
      let created = await FileUpload.create(filesCreate[0]).fetch();
      return this.res.send({
        code: 0,
        data: created
      });
    } catch (error) {
      return this.res.send({
        code: 1,
        message: "Đăng ảnh thất bại",
        error: String(error)
      });
    }

  }


};
