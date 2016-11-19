import { cropsCollection } from '../../../lib/collections/crops.js'

Template.EditCrop.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('crop_id')
		const data = cropsCollection.findOne({_id})
		return data
	}
})


Template.EditCrop.events ({
	'click #update-crop ' : function(e) {
		//getting the  fields as well as the data
        const cropID = FlowRouter.getParam('crop_id')
		const cropField = $('#crop')
        const crop = cropField.val()
        Meteor.call ('update-crop',cropID,crop)
        console.log ("added")
        cropField.val = " "
        FlowRouter.go ('/crop')
         
         
	}
})