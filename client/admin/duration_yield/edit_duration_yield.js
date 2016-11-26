import { durationYields } from '../../../lib/collections/duration_yield.js'
import { cropsCollection } from '../../../lib/collections/crops.js'

Template.EditDurationYield.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('yield_id')
		const data = durationYields.findOne({_id})
		return data
	},

        cropData: function() {
                const cropData  = cropsCollection.find({}).fetch()         
                return cropData
        }  
})


Template.EditDurationYield.events ({
	'click #update-duration-yield-button ' : function(e) {

		//getting the  fields as well as the data
                const locationID = FlowRouter.getParam('location_id')
        	const durationYieldID = FlowRouter.getParam('yield_id')                
                const weekNoField = $("#weekNo")
                const weekNo = weekNoField.val()               
                const yieldField = $("#yield")
                const yields = yieldField.val()
                const cropField = $('#cropSelection')
                const cropType = cropField.val()
        

        Meteor.call('update-duration-yield',durationYieldID,locationID,cropType,weekNo,yields)           
        
 
        
        weekNoField.val = " "        
        yieldField.val = " "

        FlowRouter.go(`/duration_yield/${locationID}`)
	}
})