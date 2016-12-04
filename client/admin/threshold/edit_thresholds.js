import { thresholdsCollection } from '../../../lib/collections/thresholds.js'
import { cropsCollection } from '../../../lib/collections/crops.js'
import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'

Template.EditThreshold.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('thresholds')
            Meteor.subscribe('crops')
            Meteor.subscribe('cropVarieties')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Meteor.autorun(() => {

    const _id = FlowRouter.getParam('threshold_id')
    const data = thresholdsCollection.findOne({_id})

    //populate the  cropType select
    const cropData  = cropsCollection.find({}).fetch()
    const cropField = $('#cropSelectionThreshold')
    cropField.empty()
    cropData.forEach((item) => {
        if ((data && data.cropType) == item.crop) {
            cropField.append("<option selected='selected' value =" + item._id +">" + item.crop + "</option>");
        } else {
            cropField.append("<option value =" + item._id +">" + item.crop + "</option>");
        } 
    }); 

    //populate the crop variety
    const varietyField = $('#cropVarietySelectionThreshold')
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

    //  const cropVarietyData  = cropVarietiesCollection.find({}).fetch() 
  //console.log("on rendered function"+cropVarietyData.length)
    
});


Template.EditThreshold.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('threshold_id')
		const data = thresholdsCollection.findOne({_id})
		return data
	}
})


Template.EditThreshold.events ({


    'change #cropSelectionThreshold' : function(e){
         
        //get the value of  the  province field
        const cropField = $('#cropSelectionThreshold') 
        const cropID =  cropField.val()        
        //gets the variety field and empty its options
        const varietyField = $('#cropVarietySelectionThreshold')
        varietyField.empty()
        //retrieves the list of varieties as specified by what crop is selected        
        const dataVariety  = cropVarietiesCollection.find({cropID: cropID}).fetch() 
        //adds options to the select tag
        dataVariety.forEach((item) => {
            varietyField.append("<option>" + item.variety + "</option>");
        }); 


    },

	'click #edit-threshold ' : function(e) {
		//getting the  fields as well as the data
        const _id = FlowRouter.getParam('threshold_id')
		const cropField = $('#crop')
        const cropType = $('#cropSelectionThreshold').find('option:selected').text()         
        const cropVariety = $('#cropVarietySelectionThreshold').find('option:selected').text()
        const daysField = $('#days')
        const days = daysField.val()
        const amountRainfallField = $('#amountRainfall')
        const amountRainfall = amountRainfallField.val()
        
        Meteor.call ('update-thresholds',_id,cropType,cropVariety,days,amountRainfall)
        console.log ("added")        
        daysField.val = " "
        amountRainfallField.val = " "

        FlowRouter.go ('/threshold')        
	}
})
