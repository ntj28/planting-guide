
Template.Location.events({
	'click #edit-location-button' : function(e) {
		FlowRouter.go(`/location/${this._id}`)
	},

	'click #delete-location-button' :  function (e) {
		Meteor.call('delete-location', this._id)
	},

	'click #update-crop-yield' : function(e){
		FlowRouter.go(`/crop_yield/${this._id}`)
	},

	'click #update-duration-yield' : function(e){
		FlowRouter.go(`/duration_yield/${this._id}`)
	}
})