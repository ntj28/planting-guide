import { province  } from '../../lib/collections/province.js'

Meteor.publish('province',()=>{

	return province.find({})
})