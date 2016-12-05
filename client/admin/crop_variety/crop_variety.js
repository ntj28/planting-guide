import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'

Template.Varieties.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('cropVarieties')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


Template.Varieties.helpers ({
	variety: function() {
		const _id = FlowRouter.getParam('crop_id')
		const variety = cropVarietiesCollection.find({cropID: _id }).fetch()
		return variety
	}
	 
})


Template.Varieties.events({
	'click #add-variety-button' : function (e) {
		const _id = FlowRouter.getParam('crop_id')
		FlowRouter.go(`/addCropVariety/${_id}`)
	},

	'click #done-button' : function (e) {
		//const id = FlowRouter.getParam('location_id')
		//console.log(id)	
		//kulang p
		 FlowRouter.go(`/crop`)
	}
})