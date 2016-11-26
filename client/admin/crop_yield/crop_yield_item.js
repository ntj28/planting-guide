Template.CropYieldData.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.CropYieldData.events({
	'click #edit-crop-yield-button' : function(e) {
		const _id = FlowRouter.getParam('location_id')		 
		FlowRouter.go(`/edit_crop_yield/${this._id}/${_id}`)
	},

	'click #delete-crop-yield-button' :  function (e) {
		Meteor.call('delete-crop-yield', this._id)
	}
	 
})