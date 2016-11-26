import { amountRainfallCollection } from '../../../lib/collections/amount_rainfall.js'

Template.editRainfall.helpers({
	data:()=> {
		const _id = FlowRouter.getParam('rainfallID')
		const data = amountRainfallCollection.findOne({_id})
		return data
	}
})


Template.editRainfall.events ({
	'click #edit-rainfall-button ' : function(e) {
		//getting the  fields as well as the data
		const rainfallID = FlowRouter.getParam('rainfallID')
		const awsID = FlowRouter.getParam('awsID')     
        const amountRainfallField = $('#amountRainfall')
        const amountRainfall = amountRainfallField.val()
        const dateField = $('#date')
        const date = dateField.val()
         

        //calling the meteor method to save
        Meteor.call('update-rainfall-data',awsID,date,amountRainfall)
            //log the  console to see if it has been saved
        //console.log('added')
            //clearing the entries
        amountRainfallField.val = ''
        
        console.log(awsID)               
            //redirects to main page for 
        FlowRouter.go(`/rainfall/${awsID}`)
	}
})