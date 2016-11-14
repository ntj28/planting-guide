import { cropYields } from '../../../lib/collections/crop_yield.js'

Template.EditCropYield.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('crop_id')
		const data = cropYields.findOne({_id})
		return data
	}
})


Template.EditCropYield.events ({
	'click #EditCropYieldButton ' : function(e) {
		//getting the  fields as well as the data
		const cropYieldID = FlowRouter.getParam('crop_id')
        const cropTypeField = $('#cropType')
        const cropType = cropTypeField.val()
        const cropYieldField = $('#cropYield')
        const cropYield =  cropYieldField.val()
        const _id = FlowRouter.getParam('location_id')
		console.log(_id)

        //calling the meteor method to save
        Meteor.call('update-crop-yield',cropYieldID, cropType,cropYield)
            //log the  console to see if it has been saved
        console.log('added')
            //clearing the entries
        cropTypeField.val = ''
        cropYieldField.val = ''         
            //redirects to main page for 
        FlowRouter.go(`/crop_yield/${_id}`)
	}
})
