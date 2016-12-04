import { cropsCollection } from '../../../lib/collections/crops.js'
import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'

Template.AddCropYield.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('crops')
            Meteor.subscribe('cropVarieties')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.AddCropYield.helpers ({
    dataCrop: function() {
        const dataCrop  = cropsCollection.find({}).fetch()         
        return dataCrop
    },

    dataVariety: function() {
        const dataVariety  = cropVarietiesCollection.find({}).fetch()         
        return dataVariety
    }     
})

/*Meteor.autorun(() => {    
    //populate the  cropType select
    const cropData  = cropsCollection.find({}).fetch()
    const cropField = $('#cropSelectionCropYieldAdd')
    cropField.empty()
    cropData.forEach((item) => {        
            cropField.append("<option value =" + item._id +">" + item.crop + "</option>");        
    }); 

    //populate the crop variety
    const varietyField = $('#cropVarietySelectionCropYieldAdd')
    varietyField.empty()
    const cropID =  cropField.val()
    const dataVariety  = cropVarietiesCollection.find({cropID: cropID}).fetch()

    //adds options to the select tag
    
    dataVariety.forEach((item) => { 

            varietyField.append("<option value =" + item.variety +">" + item.variety + "</option>");     
        
    });
    console.log("autorun heere")  

    //  const cropVarietyData  = cropVarietiesCollection.find({}).fetch() 
  //console.log("on rendered function"+cropVarietyData.length)
    
}); */



Template.AddCropYield.events({

    'change #cropSelectionCropYieldAdd' : function(e){
        //get the value of  the  province field
        const cropField = $('#cropSelectionCropYieldAdd') 
        const cropID =  cropField.val()    

        //gets the variety field and empty its options
        const varietyField = $('#cropVarietySelectionCropYieldAdd')
        varietyField.empty()
        //retrieves the list of city as specified by what province is selected
        const dataVariety  = cropVarietiesCollection.find({cropID: cropID}).fetch() 
        //adds options to the select tag
        dataVariety.forEach((item) => {
            varietyField.append("<option>" + item.variety + "</option>");
        });   

    },



	'click #AddCropYieldButton' : function (e) {
		//getting the  name fields and thier values
		const locationID = FlowRouter.getParam('location_id')
		console.log(locationID)       
        const cropType = $('#cropSelectionCropYieldAdd').find('option:selected').text()
        const cropYieldField = $('#cropYield')
        const cropYield = cropYieldField.val()        
        const cropVariety = $('#cropVarietySelectionCropYieldAdd').find('option:selected').text()
        
         
        //saving the  data
		Meteor.call ('add-crop-yield',locationID,cropType,cropVariety,cropYield)
		console.log('added')
		FlowRouter.go(`/crop_yield/${locationID}`)
		//clearing the  fields
		cropYieldField.val =' '
	},

	'click #Cancel ' : function (e) {
		const locationID = FlowRouter.getParam('location_id')
		FlowRouter.go(`/crop_yield/${locationID}`)

	}
})