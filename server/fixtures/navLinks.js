import { NavLinks } from '../../lib/collections/nav-links.js'

//this populates first the data into the  database when there is no entry
if (NavLinks.find().count()===0){
	
	NavLinks.insert({
		LinkText:'Home',
		link: '/',
		user:'guest'
	})

	NavLinks.insert({
		LinkText: 'Login',
		link:'/login',
		user: 'guest'
	})

	NavLinks.insert({
		LinkText: 'Register',
		link:'/register',
		user: 'admin'
	})


	
	NavLinks.insert({
		LinkText: 'Manage Week Numbers',
		link:'/setUpWeek',
		user: 'admin'
	})


	NavLinks.insert({
		LinkText: 'Manage Province',
		link:'/province',
		user: 'admin'
	})

	NavLinks.insert({
		LinkText: 'Manage Crops',
		link:'/crop',
		user: 'admin'
	})

	NavLinks.insert({
		LinkText: 'Manage Locations',
		link:'/location',
		user: 'admin'
	})


	NavLinks.insert({
		LinkText: 'Manage Thresholds',
		link:'/threshold',
		user: 'admin'
	})


















}