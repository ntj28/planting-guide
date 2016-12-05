import { amountRainfallCollection } from '../../lib/collections/amount_rainfall.js'

 

Meteor.publish('amountOfRainfall',()=>{

	return amountRainfallCollection.find({})
})


 