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
	'click #edit-crop-button' : function(e) {
		FlowRouter.go(`/editCrop/${this._id}`)
	},

	'click #delete-crop-button' :  function (e) {
		Meteor.call('delete-crop', this._id)
		 
	}

	

	 
})