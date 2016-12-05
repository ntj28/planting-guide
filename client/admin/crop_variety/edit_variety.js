import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'

Template.EditCropVariety.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('cropVarieties')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});


Template.EditCropVariety.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('variety_id')
		const data = cropVarietiesCollection.findOne({_id})
		return data
	}
})


Template.EditCropVariety.events ({
	'click #edit-variety-button ' : function(e) {
		//getting the  fields as well as the data
		const varietyID = FlowRouter.getParam('variety_id') 
        const cropID = FlowRouter.getParam('crop_id')       
        const varietyField = $('#variety')
        const variety = varietyField.val()

        //retrieve the old variety name
        const data = cropVarietiesCollection.findOne({_id:varietyID})
        varietyOld = (data && data.variety)

        let exist = cropVarietiesCollection.findOne({ variety : {
                     $regex : new RegExp(variety, "i") } })

        if (exist == null){
            
            //update the  crop yield entries
            Meteor.call ('update-variety-history',varietyOld,variety)

            //update the  weekly yield entries
            Meteor.call ('update-crop-variety',varietyOld,variety)

            //update the thresholds collection
            Meteor.call ('update-variety-threshold',varietyOld,variety)

                    

            //calling the meteor method to save
            Meteor.call('update-variety',varietyID, variety)
            //log the  console to see if it has been saved
            console.log('added')
            //clearing the entries
            varietyField.val = ''  
            //redirects to main page for 
            FlowRouter.go(`/cropVariety/${cropID}`)

        } else {
            alert("Variety is already in the collection");         
        }

	}
})