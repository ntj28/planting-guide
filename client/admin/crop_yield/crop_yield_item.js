Template.CropYieldData.events({
	'click #edit-crop-yield-button' : function(e) {
		const _id = FlowRouter.getParam('location_id')		 
		FlowRouter.go(`/edit_crop_yield/${this._id}/${_id}`)
	},

	'click #delete-crop-yield-button' :  function (e) {
		Meteor.call('delete-crop-yield', this._id)
	}
	 
})