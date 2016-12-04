import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'

Meteor.methods ({
	'add-amount-rainfall' : function (awsID, date,amount_rainfall) {
		amountRainfallCollection.insert({
			awsID : awsID,
			date: date,
			amount_rainfall :  amount_rainfall			 
		})
	} ,

	'update-rainfall-data' : function(awsID,date,amount_rainfall) {
        amountRainfallCollection.update (
            {awsID,date},//filters to be updaated
            {
                $set: {
                         
                    awsID : awsID,
                    date: date,
                    amount_rainfall :  amount_rainfall
                                       
                }
            },

                {upsert : true}
            
        )

    },

    'update-awsID' : function(awsID, awsIDNew) {
        amountRainfallCollection.update (
            {awsID},//filters to be updaated
            {
                $set: {
                         
                    awsID:awsIDNew,
                                                            
                }
            },

                { multi: true}
            
        )

    },




	'delete-rainfall-data': function(id){
        amountRainfallCollection.remove({
            _id:id
        })
    },

	 
})