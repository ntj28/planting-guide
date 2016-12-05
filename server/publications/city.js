import { cityCollection } from '../../lib/collections/city.js'

Meteor.publish('cities',()=>{

	return cityCollection.find({})
})
