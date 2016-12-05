import { cropYields } from '../../../lib/collections/crop_yield.js'

Template.CropYield.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('cropYields')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


Template.CropYield.helpers ({
	cropYields: function() {
		const _id = FlowRouter.getParam('location_id')
		const cropYield   = cropYields.find({locationID: _id }).fetch()
		return cropYield
	}
	 
})


Template.CropYield.events({
	'click #add-crop-yield-button' : function (e) {
		const id = FlowRouter.getParam('location_id')	
		 FlowRouter.go(`/addCropYield/${id}`)
	},

	'click #exit-crop-yield-button' : function (e) {
		
		 FlowRouter.go(`/location`)
	}

})