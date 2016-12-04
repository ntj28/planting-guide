Template.Location.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


Template.Location.events({
	'click #edit-location-button' : function(e) {
		FlowRouter.go(`/location/${this._id}`)
	},

	'click #delete-location-button' :  function (e) {
		//delete from locations collection
		Meteor.call('delete-location', this._id)
		//delete from amount of rainfall collection
		Meteor.call('delete-rainfall-awsID',this.awsID)
	},

	'click #update-crop-yield' : function(e){
		FlowRouter.go(`/crop_yield/${this._id}`)
	},

	'click #update-duration-yield' : function(e){
		FlowRouter.go(`/duration_yield/${this._id}`)
	},

	'click #view-rainfall' : function(e){
		FlowRouter.go(`/rainfall/${this.awsID}`)
	}
})