Template.AddProvince.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.AddProvince.events ({
	'click #SaveProvince ' : function (e) {
		const ProvinceField = $('#province')
		const province = ProvinceField.val()
		Meteor.call ('add-province',province)
		console.log ("added")
		ProvinceField.val = " "
		FlowRouter.go ('/province')

	},
	'click #cancel-threshold ' : function (e) {
        
        FlowRouter.go('/province')

    }
})