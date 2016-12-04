import { cropsCollection } from '../../../lib/collections/crops.js'
import { cropVarietiesCollection  } from '../../../lib/collections/crop_varieties.js'

Template.viewingCriteria.onCreated( () => {
	//var currentUser = Meteor.userId();
	Meteor.subscribe('crops')
	Meteor.subscribe('cropVarieties')
        
});

Template.viewingCriteria.helpers ({
    dataCrop: function() {
        const dataCrop  = cropsCollection.find({}).fetch()         
        return dataCrop
    },

    dataVariety: function() {
        const dataVariety  = cropVarietiesCollection.find({}).fetch()         
        return dataVariety
    }     
})

Template.viewingCriteria.events({

	'change #cropSelectionView' : function(e){
        //get the value of  the  province field
        const cropField = $('#cropSelectionView') 
        const cropID =  cropField.val()    

        //gets the variety field and empty its options
        const varietyField = $('#cropVarietySelectionView')
        varietyField.empty()
        //retrieves the list of city as specified by what province is selected
        const dataVariety  = cropVarietiesCollection.find({cropID: cropID}).fetch() 
        //adds options to the select tag
        dataVariety.forEach((item) => {
            varietyField.append("<option>" + item.variety + "</option>");
        });   

    },


	'click #simulate-button ' : function (e) {
		const awsID = FlowRouter.getParam('awsID')
		const locationID = FlowRouter.getParam('locationID')
		const dateField = $('#date') 
        const date =  dateField.val()
        const cropType = $('#cropSelectionView').find('option:selected').text()
		const cropVariety = $('#cropVarietySelectionView').find('option:selected').text()
		  
		FlowRouter.go(`/chart/${awsID}/${date}/${locationID}/${cropType}/${cropVariety}`)

	}
})