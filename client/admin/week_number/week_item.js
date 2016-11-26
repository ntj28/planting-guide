Template.weekItem.events({
	'click #edit-week-button' : function(e) {
		FlowRouter.go(`/editWeek/${this._id}`)
	},

})