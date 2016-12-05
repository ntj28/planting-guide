import { cropsCollection } from '../../../lib/collections/crops.js'

Template.EditCrop.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('crops')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.EditCrop.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('crop_id')
		const data = cropsCollection.findOne({_id})
		return data
	}
})


Template.EditCrop.events ({
	'click #update-crop ' : function(e) {
        const cropID = FlowRouter.getParam('crop_id')
        
        //retrieve the old crop name
        const data = cropsCollection.findOne({_id:cropID})
        cropOld = (data && data.crop)

		//getting the  fields as well as the data        
		const cropField = $('#crop')
        const crop = cropField.val()

        let exist = cropsCollection.findOne({ crop : {
                     $regex : new RegExp(crop, "i") } })

        if (exist == null){

            //update the historical crop yield entries
            Meteor.call ('update-crop-type',cropOld,crop)

            //update the weekly yield entries
            Meteor.call ('update-crop-name',cropOld,crop)

            //update the thresholds entries
            Meteor.call ('update-crop-type-threshold',cropOld,crop)


            //update the  crops collection
            Meteor.call ('update-crop',cropID,crop)        
            FlowRouter.go ('/crop')

        } else {
            alert("Crop is already in the collection");         
        }
         
         
	}
})