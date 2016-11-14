Template.AddCropYield.events({
	'click #AddCropYieldButton' : function (e) {
		//getting the  name fields and thier values
		const locationID = FlowRouter.getParam('location_id')
		console.log(locationID)        
        const cropTypeField = $('#cropType')
        const cropType = cropTypeField.val()
        const cropYieldField = $('#cropYield')
        const cropYield = cropYieldField.val()
         
        //saving the  data
		Meteor.call ('add-crop-yield',locationID,cropType,cropYield)
		console.log('added')
		FlowRouter.go(`/crop_yield/${locationID}`)
		//clearing the  fields
		cropTypeField.val = ' '
		cropYieldField.val =' '
	},

	'click #Cancel ' : function (e) {
		const locationID = FlowRouter.getParam('location_id')
		FlowRouter.go(`/crop_yield/${locationID}`)

	}
})