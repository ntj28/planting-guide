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
		//delete from crops collection
		Meteor.call('delete-crop', this._id)

		//delete from crop yield collection
		Meteor.call('delete-crop-yield-cropType', this.crop)

		//delete from duration yield
		Meteor.call('delete-duration-yield-cropType', this.crop)

		//delete from threshold collection
		Meteor.call('delete-thresholds-cropType', this.crop)

		//delete from crop variety
		Meteor.call('delete-variety-cropID', this._id)



		 
	}

	

	 
})