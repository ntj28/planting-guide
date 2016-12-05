import { province  } from '../../../lib/collections/province.js'

Template.AddProvince.onCreated( () => {

  var currentUser = Meteor.userId();
        if(currentUser){
            // logged-in
            Meteor.subscribe('province')
        } else {
            // not logged-in
            FlowRouter.go('/')

        }
});

Template.AddProvince.events ({
	'click #SaveProvince ' : function (e) {
		const ProvinceField = $('#province')
		const provinceData = ProvinceField.val()

        let exist = province.findOne({ province : {
                     $regex : new RegExp(provinceData, "i") } })


        if (exist == null){
    		Meteor.call ('add-province',provinceData)		
    		ProvinceField.val = " "
    		FlowRouter.go ('/province')

        } else {
            alert("Province is already in the collection");         
        }

	},
	'click #cancel-threshold ' : function (e) {
        
        FlowRouter.go('/province')

    }
})