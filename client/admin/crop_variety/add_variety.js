import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'
Template.AddVariety.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('cropVarieties')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.AddVariety.events ({
	'click #SaveVariety ' : function (e) {
		const varietyField = $('#variety')
		const variety = varietyField.val()
		const cropID = FlowRouter.getParam('crop_id')

		let exist = cropVarietiesCollection.findOne({ variety : {
                     $regex : new RegExp(variety, "i") } })
		
        if (exist == null){
			Meteor.call ('add-variety',cropID, variety)		
			varietyField.val = " "
			FlowRouter.go(`/cropVariety/${cropID}`)
		} else {
            alert("Variety is already in the collection");         
        }

	},
	'click #Cancel ' : function (e) {
		const cropID = FlowRouter.getParam('crop_id')
		FlowRouter.go(`/cropVariety/${cropID}`)

	}
})