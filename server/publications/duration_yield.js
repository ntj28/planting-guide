import { durationYields } from '../../lib/collections/duration_yield.js'

Meteor.publish('durationYield',()=>{

	return durationYields.find({})
})