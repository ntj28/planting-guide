Template.cropItem.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.cropItem.events({
	
	'click #view-variety-button' :  function (e) {
		 FlowRouter.go(`/cropVariety/${this._id}`)
		 
	},

	'click #edit-crop-button' : function(e) {
		FlowRouter.go(`/editCrop/${this._id}`)
	},

	'click #delete-crop-button' :  function (e) {
		Meteor.call('delete-crop', this._id)
		 
	}

	

	 
})