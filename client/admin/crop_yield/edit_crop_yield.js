import { cropYields } from '../../../lib/collections/crop_yield.js'
import { cropsCollection } from '../../../lib/collections/crops.js'
import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'

Template.EditCropYield.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('cropYields')
            Meteor.subscribe('crops')
            Meteor.subscribe('cropVarieties')
            
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.EditCropYield.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('crop_id')
		const data = cropYields.findOne({_id})
		return data
	},
    cropData: function() {
        const cropData  = cropsCollection.find({}).fetch()         
        return cropData
    },
    cropVarietyData: function() {
        const cropVarietyData  = cropVarietiesCollection.find({}).fetch()         
        return cropVarietyData
    } 
})


Template.EditCropYield.events ({
    'change #cropSelection' : function(e){
        //get the value of  the  province field
        const cropField = $('#cropSelection') 
        const cropID =  cropField.val()    

        //gets the variety field and empty its options
        const varietyField = $('#cropVarietySelection')
        varietyField.empty()
        //retrieves the list of varieties as specified by what crop is selected        
        const dataVariety  = cropVarietiesCollection.find({cropID: cropID}).fetch() 
        //adds options to the select tag
        dataVariety.forEach((item) => {
            varietyField.append("<option>" + item.variety + "</option>");
        });   

    },
	'click #EditCropYieldButton ' : function(e) {
		//getting the  fields as well as the data
		const cropYieldID = FlowRouter.getParam('crop_id')
        const cropTypeField = $('#cropType')
        const cropType = cropTypeField.val()
        const cropVarityField = $('#cropVariety')
        const cropVariety =  cropVarityField.val()
        const cropYieldField = $('#cropYield')
        const cropYield =  cropYieldField.val()
        const _id = FlowRouter.getParam('location_id')
		console.log(_id)

        //calling the meteor method to save
        Meteor.call('update-crop-yield',cropYieldID, cropType,cropVariety,cropYield)
            //log the  console to see if it has been saved
        console.log('added')
            //clearing the entries
        cropTypeField.val = ''
        cropYieldField.val = ''         
            //redirects to main page for 
        FlowRouter.go(`/crop_yield/${_id}`)
	}
})
