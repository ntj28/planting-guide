Template.varietyItem.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.varietyItem.events({
	'click #edit-variety-button' : function(e) {
		const crop_id = FlowRouter.getParam('crop_id')				 
		FlowRouter.go(`/editCropVariety/${this._id}/${crop_id}`)
	},

	'click #delete-variety-button' :  function (e) {
		Meteor.call('delete-variety', this._id)
	}
	 
})