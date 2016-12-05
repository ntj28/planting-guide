import { cropYields } from '../../lib/collections/crop_yield.js'

Meteor.publish('cropYields',()=>{

	return cropYields.find({})
})