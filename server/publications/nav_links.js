import { NavLinks } from '../../lib/collections/nav-links.js'
 
Meteor.publish('nav-links',()=>{

	return NavLinks.find({})
})

