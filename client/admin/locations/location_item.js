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
		Meteor.call('delete-location', this._id)
		Meteor.call('delete-rainfall-data',this._id)
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