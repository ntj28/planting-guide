import { location } from '../../lib/collections/locations.js'

Meteor.publish('locations',()=>{

	return location.find({})
})