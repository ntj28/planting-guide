import { cropsCollection  } from '../../../lib/collections/crops.js'

Template.AddCrop.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('crops')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.AddCrop.events ({
	'click #SaveCrop ' : function (e) {
		const cropField = $('#crop')
		const crop = cropField.val()

		let exist = cropsCollection.findOne({ crop : {
                     $regex : new RegExp(crop, "i") } })

		if (exist == null){

			Meteor.call ('add-crop',crop)			
			cropField.val = " "
			FlowRouter.go ('/crop')

		} else {
            alert("Crop is already in the collection");         
        }

	},
	'click #Cancel ' : function (e) {
        
        FlowRouter.go('/crop')

    }
})