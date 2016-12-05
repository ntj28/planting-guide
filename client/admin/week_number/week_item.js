Template.weekItem.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


Template.weekItem.events({
	'click #edit-week-button' : function(e) {
		FlowRouter.go(`/editWeek/${this._id}`)
	},

})