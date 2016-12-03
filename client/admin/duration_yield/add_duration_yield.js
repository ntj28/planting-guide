import { location } from '../../../lib/collections/locations.js'
import { province } from '../../../lib/collections/province.js'
import { cityCollection } from '../../../lib/collections/city.js'
import { cropsCollection } from '../../../lib/collections/crops.js'
import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'

Template.AddDurationYield.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('crops')
            Meteor.subscribe('cropVarieties')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


Template.AddDurationYield.helpers ({

	cropData: function() {
        const cropData  = cropsCollection.find({}).fetch()         
        return cropData
    },
    
    cropVarietyData: function() {
        const cropVarietyData  = cropVarietiesCollection.find({}).fetch()         
        return cropVarietyData
    }    
})

Template.AddDurationYield.events({

  'change #cropSelection' : function(e){
        //get the value of  the  province field
        const cropField = $('#cropSelection') 
        const cropID =  cropField.val()    

        //gets the variety field and empty its options
        const varietyField = $('#cropVarietySelection')
        varietyField.empty()
        //retrieves the list of city as specified by what province is selected
        const dataVariety  = cropVarietiesCollection.find({cropID: cropID}).fetch() 
        //adds options to the select tag
        dataVariety.forEach((item) => {
            varietyField.append("<option>" + item.variety + "</option>");
        });   

    },
	
	'click #add-yield-button' : function (e) {
		//getting the entries
		const locationID = FlowRouter.getParam('location_id')		
		const weekNoField = $("#weekNo")
		const weekNo = weekNoField.val()		
		const yieldField = $("#yield")
		const yields = yieldField.val()    
    const cropType = $('#cropSelection').find('option:selected').text()
    const cropVarietyField = $('#cropVarietySelection')
    const cropVariety = cropVarietyField.val()
		

		Meteor.call('add-duration-yields',locationID,cropType,cropVariety,weekNo,yields)
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
    const cropType = $('#cropSelection').find('option:selected').text()
    const cropVarietyField = $('#cropVarietySelection')
    const cropVariety = cropVarietyField.val()
    
    var extension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();

    if (extension =='csv'){

        Papa.parse( event.target.files[0], {
          header: false,
          complete( results, file ) {
            Meteor.call( 'parseUploadYield', results.data,locationID,cropType,cropVariety, ( error, response ) => {
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