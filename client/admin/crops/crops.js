import { cropsCollection  } from '../../../lib/collections/crops.js'

Template.Crops.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.Crops.helpers ({
	cropData: function() {
		const cropData = cropsCollection.find({}).fetch()
		return cropData
	}
	 
})


Template.Crops.events({
	'click #add-crop-button' : function (e) {
		 FlowRouter.go('/addCrop')
	}
})