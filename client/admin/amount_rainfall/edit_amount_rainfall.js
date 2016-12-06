import { amountRainfallCollection } from '../../../lib/collections/amount_rainfall.js'

Template.editRainfall.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('amountOfRainfall')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

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
        amountRainfallField.val = ''
        
                     
        //redirects to main page for 
        FlowRouter.go(`/rainfall/${awsID}`)
	},
    'click #Cancel ' : function (e) {
        const awsID = FlowRouter.getParam('awsID')  
        FlowRouter.go(`/rainfall/${awsID}`)

    }
})