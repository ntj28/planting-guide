import { cropVarietiesCollection } from '../../lib/collections/crop_varieties.js'

 

Meteor.publish('cropVarieties',()=>{

	return cropVarietiesCollection.find({})
})
