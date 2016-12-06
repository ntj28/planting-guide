import { NavLinks } from '../../../lib/collections/nav-links.js'

Template.nav.onCreated(()=>{

	Meteor.subscribe('nav-links')
})


Template.nav.helpers ({
	links: function(){

		var currentUser = Meteor.userId();        

        let links

        if(currentUser){
            // logged-in            
            links = NavLinks.find({user:"admin"}).fetch()
        } else {
            // not logged-in
            links = NavLinks.find({user:"guest"}).fetch()

        }

         
		
		return links
	}


})

Template.nav.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        FlowRouter.go('/')
        
    }
});