import { amountRainfallCollection  } from '../../../lib/collections/amount_rainfall.js';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
 


import './amount_rainfall.html';

Template.upload.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


 
//papa - parse
Template.upload.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.upload.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.upload.events({
  //'change [name="uploadCSV"] ' ( event, template ) {
    'change #upload ' : function(event,template){
    template.uploading.set( true );
    const awsID = FlowRouter.getParam('awsID')
    const fileName =  $('#upload').val()
    
    var extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

    if (extension =='csv'){

        Papa.parse( event.target.files[0], {
          header: false,
          complete( results, file ) {
            Meteor.call( 'parseUpload', results.data,awsID, ( error, response ) => {
              if ( error ) {
                console.log( error.reason );
              } else {
                template.uploading.set( false );
                //Bert.alert( 'Upload complete!', 'success', 'growl-top-right' );
              }
            });
          }
        });

    } else {
      console.log("invalid extension")
      template.uploading.set( false );
    }




   
  }
});



Template.Rainfall.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


Template.Rainfall.helpers ({
	rainfall_data: function() {
		const awsID = FlowRouter.getParam('awsID')
		const rainfall_data   = amountRainfallCollection.find({awsID: awsID }).fetch()
		return rainfall_data
	} 	 
});


 