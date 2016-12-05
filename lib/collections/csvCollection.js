this.CSV = new Meteor.Files({
  debug: true,
  //storagePath: 'data/uploads/CSV',
  collectionName: 'CSV',
  allowClientCode: false, // Disallow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024*1024*10 && /csv/i.test(file.extension)) {
      return true;
    } else {
      return 'Please upload a csv file, with size equal or less than 10MB';
    }
  }
});

//if (Meteor.isServer) {
//  Images.denyClient();
//  Meteor.publish('files.images.all', function () {
//    return Images.find().cursor;
//  });

//} else {

//  Meteor.subscribe('files.images.all');
//}