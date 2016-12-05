import { cropsCollection } from '../../../lib/collections/crops.js'
import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'

Template.AddCropYield.onCreated( () => {

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


Template.AddCropYield.helpers ({
    cropData: function() {
        const cropData  = cropsCollection.find({}).fetch()         
        return cropData
    },
    cropVarietyData: function() {
        const cropVarietyData  = cropVarietiesCollection.find({}).fetch()         
        return cropVarietyData
    }   
})



Template.AddCropYield.events({

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



	'click #AddCropYieldButton' : function (e) {
		//getting the  name fields and thier values
		const locationID = FlowRouter.getParam('location_id')
		console.log(locationID)       
        const cropType = $('#cropSelection').find('option:selected').text()
        const cropYieldField = $('#cropYield')
        const cropYield = cropYieldField.val()
        const varietyField = $('#cropVarietySelection')
        const cropVariety = varietyField.val()
        
         
        //saving the  data
		Meteor.call ('add-crop-yield',locationID,cropType,cropVariety,cropYield)
		console.log('added')
		FlowRouter.go(`/crop_yield/${locationID}`)
		//clearing the  fields
		cropYieldField.val =' '
	},

	'click #Cancel ' : function (e) {
		const locationID = FlowRouter.getParam('location_id')
		FlowRouter.go(`/crop_yield/${locationID}`)

	}
})