import { location } from '../../../lib/collections/locations.js'
import { province } from '../../../lib/collections/province.js'
import { cityCollection } from '../../../lib/collections/city.js'
import { cropsCollection } from '../../../lib/collections/crops.js'

Template.AddDurationYield.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('crops')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


Template.AddDurationYield.helpers ({

	cropData: function() {
        const cropData  = cropsCollection.find({}).fetch()         
        return cropData
    }  
})

Template.AddDurationYield.events({
	
	'click #add-yield-button' : function (e) {
		//getting the entries
		const locationID = FlowRouter.getParam('location_id')		
		const weekNoField = $("#weekNo")
		const weekNo = weekNoField.val()		
		const yieldField = $("#yield")
		const yields = yieldField.val()
    const cropField = $('#cropSelection')
    const cropType = cropField.val()
		

		Meteor.call('add-duration-yields',locationID,cropType,weekNo,yields)
		console.log("added")
		 
		weekNoField.val = " "		
		yieldField.val = " "

		FlowRouter.go(`/duration_yield/${locationID}`)

	},

	'click #Cancel ' : function (e) {
		const locationID = FlowRouter.getParam('location_id')
		FlowRouter.go(`/duration_yield/${locationID}`)

	}

})

Template.uploadYield.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
             
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


//papa - parse
Template.uploadYield.onCreated( () => {
  Template.instance().uploading = new ReactiveVar( false );
});

Template.uploadYield.helpers({
  uploading() {
    return Template.instance().uploading.get();
  }
});

Template.uploadYield.events({
  //'change [name="uploadCSV"] ' ( event, template ) {
    'change #upload ' : function(event,template){
    template.uploading.set( true );
    const locationID = FlowRouter.getParam('location_id')
    const fileName =  $('#upload').val()
    const cropField = $('#cropSelection')
    const cropType = cropField.val()
    
    var extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

    if (extension =='csv'){

        Papa.parse( event.target.files[0], {
          header: false,
          complete( results, file ) {
            Meteor.call( 'parseUploadYield', results.data,locationID,cropType, ( error, response ) => {
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