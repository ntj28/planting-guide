import { cropsCollection } from '../../../lib/collections/crops.js'

Template.AddCropYield.helpers ({
    cropData: function() {
        const cropData  = cropsCollection.find({}).fetch()         
        return cropData
    }    
})



Template.AddCropYield.events({
	'click #AddCropYieldButton' : function (e) {
		//getting the  name fields and thier values
		const locationID = FlowRouter.getParam('location_id')
		console.log(locationID)        
        const cropField = $('#cropSelection')
        const cropType = cropField.val()
        const cropYieldField = $('#cropYield')
        const cropYield = cropYieldField.val()
        
         
        //saving the  data
		Meteor.call ('add-crop-yield',locationID,cropType,cropYield)
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