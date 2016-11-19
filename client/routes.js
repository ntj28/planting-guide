import { Blaze } from 'meteor/blaze'

FlowRouter.route('/', {
    action: function(params, queryParams) {
        BlazeLayout.render("mainLayout", {main : "map"})
    }
})

//locations 
FlowRouter.route('/location', {
    action: function(params, queryParams) {
        BlazeLayout.render("mainLayout", { main: "Locations" })
    }
})

FlowRouter.route('/addLocation',{
	action: function(params, queryParams){
		BlazeLayout.render("mainLayout",{main: "AddLocation"})
	}
})

FlowRouter.route ('/location/:location_id', {
	action: function(params, queryParams){
		BlazeLayout.render("mainLayout", { main:"EditLocation" })
	}
})

// crop yields
FlowRouter.route('/crop_yield/:location_id', {
	action: function(params, queryParams) {
		BlazeLayout.render("mainLayout", {main: "CropYield"})
	}
})


FlowRouter.route('/addCropYield/:location_id',{
	action: function(params, queryParams){
		BlazeLayout.render("mainLayout",{main: "AddCropYield"})
	}
})

FlowRouter.route ('/edit_crop_yield/:crop_id/:location_id', {
	action: function (params, queryParams,queryParams2) {
		BlazeLayout.render("mainLayout", {main: "EditCropYield"})
	}
})

//duration yields

FlowRouter.route ('/duration_yield/:location_id', {
	action: function (params,queryParams){
		BlazeLayout.render ("mainLayout", {main: "DurationYields"})
	}
})

FlowRouter.route ('/addDurationYield/:location_id', {
	action : function (params, queryParams){
		BlazeLayout.render("mainLayout", {main: "AddDurationYield"})
	}
})

FlowRouter.route ('/edit_duration_yield/:yield_id/:location_id', {
	action: function (params, queryParams,queryParams2) {
		BlazeLayout.render("mainLayout", {main: "EditDurationYield"})
	}
})

//province
FlowRouter.route('/province', {
	action : function (params, queryParams) {
		BlazeLayout.render ("mainLayout", {main: "Province"})
	}
})

FlowRouter.route ('/addProvince' , {
	action : function (params, queryParams) {
		BlazeLayout.render ("mainLayout",{main : "AddProvince"})
	}
})

FlowRouter.route ('/editProvince/:province_id', {
	action: function (params, queryParams) {
		BlazeLayout.render ("mainLayout", {main: "EditProvince"})
	}
})

//city 
FlowRouter.route ('/city/:province_id', {
	action : function (params, queryParams) {
		BlazeLayout.render("mainLayout", {main: "City"})
	}
})

FlowRouter.route ('/addCity/:province_id', {
	action : function (params, queryParams) {
		BlazeLayout.render("mainLayout", {main: "AddCity"})
	}
})


FlowRouter.route ('/edit_city/:city_id/:province_id', {
	action: function (params, queryParams,queryParams2) {
		BlazeLayout.render("mainLayout", {main: "EditCity"})
	}
})

//chart
FlowRouter.route ('/chart/:awsID', {
	action: function(params, queryParams) {
		BlazeLayout.render("mainLayout", {main: "DailyRainfall"})
	}
})


//rainfall
FlowRouter.route ('/rainfall/:awsID', {
	action: function(params, queryParams) {
		BlazeLayout.render("mainLayout", {main: "Rainfall"})
	}
})
//edit rainfall
FlowRouter.route('/editRainfall/:rainfallID/:awsID',{
	action: function(params,queryParams,queryParams2) {
		BlazeLayout.render("mainLayout", {main:"editRainfall"})
	}
})


//thresholds
FlowRouter.route('/threshold',{
	action: function(params,queryParams) {
		BlazeLayout.render("mainLayout", {main:"Thresholds"})
	}
})

//add threshold
FlowRouter.route('/addThreshold', {
	action: function(params,queryParams) {
		BlazeLayout.render("mainLayout", {main:"AddThreshold"})
	}
})


//edit thresholds
FlowRouter.route ('/editThreshold/:threshold_id', {
	action: function(params,queryParams){
		BlazeLayout.render("mainLayout", {main:"EditThreshold"})
	}
})

//crops
FlowRouter.route('/crop', {
	action: function(params,queryParams) {
		BlazeLayout.render("mainLayout", {main:"Crops"})
	}
})

//add crops
FlowRouter.route('/addCrop', {
	action: function(params,queryParams){
		BlazeLayout.render("mainLayout", {main:"AddCrop"})

	}
	
})

//edit crops
FlowRouter.route('/editCrop/:crop_id',{
	action: function(params,queryParams){
		BlazeLayout.render("mainLayout",{main:"EditCrop"})
	}
})





