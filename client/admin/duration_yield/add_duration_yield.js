import { location } from '../../../lib/collections/locations.js'
import { province } from '../../../lib/collections/province.js'
import { cityCollection } from '../../../lib/collections/city.js'
import { cropsCollection } from '../../../lib/collections/crops.js'
import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'
import { durationYields } from '../../../lib/collections/duration_yield.js'


Template.AddDurationYield.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('crops')
            Meteor.subscribe('cropVarieties')
            Meteor.subscribe('durationYield')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.AddDurationYield.helpers ({
    dataCrop: function() {
        const dataCrop  = cropsCollection.find({}).fetch()         
        return dataCrop
    },

    dataVariety: function() {
        const dataVariety  = cropVarietiesCollection.find({}).fetch()         
        return dataVariety
    }     
})


Template.AddDurationYield.events({

  'change #cropSelectionDurationYieldAdd' : function(e){
        //get the value of  the  province field
        const cropField = $('#cropSelectionDurationYieldAdd') 
        const cropID =  cropField.val()    

        //gets the variety field and empty its options
        const varietyField = $('#cropVarietySelectionDurationYieldAdd')
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
    const cropType = $('#cropSelectionDurationYieldAdd').find('option:selected').text()
    const cropVariety = $('#cropVarietySelectionDurationYieldAdd').find('option:selected').text()
     
		let exist = durationYields.findOne({ cropType : {
                     $regex : new RegExp(cropType, "i") },
                     cropVariety :cropVariety,
                     weekNo: weekNo,
                     locationID:locationID                      
                      })

    if (exist == null){

  		Meteor.call('add-duration-yields',locationID,cropType,cropVariety,weekNo,yields)
  		
  		 
  		weekNoField.val = " "		
  		yieldField.val = " "

  		FlowRouter.go(`/duration_yield/${locationID}`)

    } else {
            alert("Weekly crop yield is already in the collection");         
    }

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
    const cropType = $('#cropSelectionDurationYieldAdd').find('option:selected').text()
    const cropVariety = $('#cropVarietySelectionDurationYieldAdd').find('option:selected').text()
    
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