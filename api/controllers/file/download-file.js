module.exports = {


  friendlyName: 'Download file',


  description: '',


  inputs: {
    // where: {
    //   type: 'ref'
    // },
    serverFileName: {
      type: 'string',
      required: true
    }
  },


  exits: {
    success: {},
  },


  fn: async function (inputs, exits) {
    var file = await FileUpload.findOne({ serverFileName: inputs.serverFileName });
    if (!file) {
      return this.res.notFound({
        message: sails.__('File không tồn tại!')
      });
    }

    this.res.attachment(file.fileName);
    var downloading = await sails.startDownload(FileUpload.getFilePath(file));
    return exits.success(downloading);
  }


};
