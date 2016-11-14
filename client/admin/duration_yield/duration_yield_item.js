Template.DurationYieldItem.events({
	'click #edit-duration-yield-button' : function(e) {
		const _id = FlowRouter.getParam('location_id')		 
		FlowRouter.go(`/edit_duration_yield/${this._id}/${_id}`)
	},

	'click #delete-duration-yield-button' :  function (e) {
		Meteor.call('delete-duration-yield', this._id)
	}
	 
})