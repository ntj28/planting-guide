import { cropYields } from '../../../lib/collections/crop_yield.js'
import { cropsCollection } from '../../../lib/collections/crops.js'
import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'



Template.EditCropYield.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('cropYields')
            Meteor.subscribe('crops')
            Meteor.subscribe('cropVarieties')
            
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.EditCropYield.onRendered(()=>{

  const cropVarietyData  = cropVarietiesCollection.find({}).fetch()          

})

Meteor.autorun(() => {

    const _id = FlowRouter.getParam('crop_id')
    const data = cropYields.findOne({_id})

    //populate the  cropType select
    const cropData  = cropsCollection.find({}).fetch()
    const cropField = $('#cropSelections')
    cropField.empty()
    cropData.forEach((item) => {
        if ((data && data.cropType) == item.crop) {
            cropField.append("<option selected='selected' value =" + item._id +">" + item.crop + "</option>");
        } else {
            cropField.append("<option value =" + item._id +">" + item.crop + "</option>");
        } 
    }); 

    //populate the crop variety
    const varietyField = $('#cropVarietySelections')
    varietyField.empty()
    const cropID =  cropField.val()
    const dataVariety  = cropVarietiesCollection.find({cropID: cropID}).fetch()

    //adds options to the select tag
    
    dataVariety.forEach((item) => {
        if ((data && data.cropVariety) == item.variety) {
            varietyField.append("<option selected='selected' value =" + item.variety +">" + item.variety + "</option>");
        } else {
            varietyField.append("<option value =" + item.variety +">" + item.variety + "</option>");
        } 

          
    });

       
});




Template.EditCropYield.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('crop_id')
		const data = cropYields.findOne({_id})

        return data
	}     

})


Template.EditCropYield.events ({

 

   
    'change #cropSelections' : function(e){       
        
        //get the value of  the  province field
        const cropField = $('#cropSelections') 
        const cropID =  cropField.val()        
        //gets the variety field and empty its options
        const varietyField = $('#cropVarietySelections')
        varietyField.empty()
        //retrieves the list of varieties as specified by what crop is selected        
        const dataVariety  = cropVarietiesCollection.find({cropID: cropID}).fetch() 
        //adds options to the select tag
        dataVariety.forEach((item) => {
            varietyField.append("<option>" + item.variety + "</option>");
        }); 


    },
	'click #EditCropYieldButton ' : function(e) {
		//getting the  fields as well as the data
		const cropYieldID = FlowRouter.getParam('crop_id')
        const cropType = $('#cropSelections').find('option:selected').text()         
        const cropVariety = $('#cropVarietySelections').find('option:selected').text() 
        const cropYieldField = $('#cropYield')
        const cropYield =  cropYieldField.val()
        const _id = FlowRouter.getParam('location_id')

        let exist = cropYields.findOne({ cropType : {
                     $regex : new RegExp(cropType, "i") },
                     cropVariety : cropVariety,                     
                     locationID:_id,
                     cropYield: cropYield                     
                      })

        if (exist == null){	

            //calling the meteor method to save
            Meteor.call('update-crop-yield',cropYieldID, cropType,cropVariety,cropYield)
             
                 
            //redirects to main page for 
            FlowRouter.go(`/crop_yield/${_id}`)

        } else {
            alert("Historical crop yield is already in the collection");         
        }
	},

    'click #Cancel ' : function (e) {
        const _id = FlowRouter.getParam('location_id')
        FlowRouter.go(`/crop_yield/${_id}`)

    }
})
