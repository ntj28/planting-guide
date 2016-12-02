import { thresholdsCollection  } from '../../lib/collections/thresholds.js'

Meteor.publish('thresholds',()=>{

	return thresholdsCollection.find({})
})