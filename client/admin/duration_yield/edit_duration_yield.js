import { durationYields } from '../../../lib/collections/duration_yield.js'
import { cropsCollection } from '../../../lib/collections/crops.js'
import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'

Template.EditDurationYield.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('crops')
            Meteor.subscribe('durationYield')
            Meteor.subscribe('cropVarieties')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});



Template.EditDurationYield.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('yield_id')
		const data = durationYields.findOne({_id})
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


Template.EditDurationYield.events ({
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

	'click #update-duration-yield-button ' : function(e) {

		//getting the  fields as well as the data
        const locationID = FlowRouter.getParam('location_id')
        const durationYieldID = FlowRouter.getParam('yield_id')                
        const weekNoField = $("#weekNo")
        const weekNo = weekNoField.val()               
        const yieldField = $("#yield")
        const yields = yieldField.val()
        const cropType = $('#cropSelection').find('option:selected').text()
        const cropVarietyField = $('#cropVarietySelection')
        const cropVariety = cropVarietyField.val()
        

        Meteor.call('update-duration-yield',durationYieldID,locationID,cropType,cropVariety,weekNo,yields)           
        
 
        
        weekNoField.val = " "        
        yieldField.val = " "

        FlowRouter.go(`/duration_yield/${locationID}`)
	}
})