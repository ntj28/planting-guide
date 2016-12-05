import { weekNoCollection } from '../../lib/collections/week_no.js'

Meteor.publish('WeekNo',()=>{

	return weekNoCollection.find({})
})