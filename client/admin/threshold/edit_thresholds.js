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

    //for the twenty and thirty days cumulative
    const daysField = $('#daysEdit')
    daysField.empty()
    //console.log(data && data.days)
    if ((data && data.days) == '20') {
        daysField.append("<option value ='20' selected ='selected'>20</option>")
        daysField.append("<option value ='30' >30</option>")
    } else {
        daysField.append("<option value ='20'>20</option>")
        daysField.append("<option value ='30' selected ='selected'>30</option>")

    }
    
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
        const days =  $('#daysEdit').find('option:selected').text()
        const amountRainfallField = $('#amountRainfall')
        const amountRainfall = amountRainfallField.val()

        let exist = thresholdsCollection.findOne({ cropType : {
                     $regex : new RegExp(cropType, "i") } ,
                     cropVariety : cropVariety  ,
                     days:days,
                     rainfall:amountRainfall

                 })

        if (exist == null){
        
        Meteor.call ('update-thresholds',_id,cropType,cropVariety,days,amountRainfall)          
        amountRainfallField.val = " "

        FlowRouter.go ('/threshold')  

        } else {
            alert("Threshold is already in the collection");         
        }      
	},
    'click #cancel-threshold ' : function (e) {
        
        FlowRouter.go('/threshold')

    }
})
