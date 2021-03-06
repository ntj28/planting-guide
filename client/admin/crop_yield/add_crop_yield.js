import { cropsCollection } from '../../../lib/collections/crops.js'
import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'
import { cropYields } from '../../../lib/collections/crop_yield.js'

Template.AddCropYield.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('crops')
            Meteor.subscribe('cropVarieties')
            Meteor.subscribe('cropYields')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.AddCropYield.helpers ({
    dataCrop: function() {
        const dataCrop  = cropsCollection.find({}).fetch()         
        return dataCrop
    },

    dataVariety: function() {
        const dataVariety  = cropVarietiesCollection.find({}).fetch()         
        return dataVariety
    }     
})


Template.AddCropYield.events({

    'change #cropSelectionCropYieldAdd' : function(e){
        //get the value of  the  province field
        const cropField = $('#cropSelectionCropYieldAdd') 
        const cropID =  cropField.val()    

        //gets the variety field and empty its options
        const varietyField = $('#cropVarietySelectionCropYieldAdd')
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
        const cropType = $('#cropSelectionCropYieldAdd').find('option:selected').text()
        const cropYieldField = $('#cropYield')
        const cropYield = cropYieldField.val()        
        const cropVariety = $('#cropVarietySelectionCropYieldAdd').find('option:selected').text()
        
        let exist = cropYields.findOne({ cropType : {
                     $regex : new RegExp(cropType, "i") },
                     cropVariety : cropVariety,                     
                     locationID:locationID,                      
                      })

        if (exist == null){
            //saving the  data
    		Meteor.call ('add-crop-yield',locationID,cropType,cropVariety,cropYield)		
    		FlowRouter.go(`/crop_yield/${locationID}`)
    		//clearing the  fields
    		cropYieldField.val =' '

        } else {
            alert("Historical crop yield is already in the collection");         
        }
	},

	'click #Cancel ' : function (e) {
		const locationID = FlowRouter.getParam('location_id')
		FlowRouter.go(`/crop_yield/${locationID}`)

	}
})