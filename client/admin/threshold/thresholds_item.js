Template.ThresholdItem.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.ThresholdItem.events({
	'click #edit-threshold-button' : function(e) {
		FlowRouter.go(`/EditThreshold/${this._id}`)
	},

	'click #delete-threshold-button' :  function (e) {
		Meteor.call('delete-thresholds', this._id)
		 
	},

})