import { cropsCollection } from '../../lib/collections/crops.js'

Meteor.publish('crops',()=>{

	return cropsCollection.find({})
})
