Template.CityItem.events({
	'click #edit-city-button' : function(e) {
		const _id = FlowRouter.getParam('province_id')		 
		FlowRouter.go(`/edit_city/${this._id}/${_id}`)
	},

	'click #delete-city-button' :  function (e) {
		Meteor.call('delete-city', this._id)
	}
	 
})