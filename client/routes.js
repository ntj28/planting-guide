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
//add location
FlowRouter.route('/addLocation',{
	action: function(params, queryParams){
		BlazeLayout.render("mainLayout",{main: "AddLocation"})
	}
})
//edit location
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

//add crop yield
FlowRouter.route('/addCropYield/:location_id',{
	action: function(params, queryParams){
		BlazeLayout.render("mainLayout",{main: "AddCropYield"})
	}
})

//edit crop yield
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

//add duration yield
FlowRouter.route ('/addDurationYield/:location_id', {
	action : function (params, queryParams){
		BlazeLayout.render("mainLayout", {main: "AddDurationYield"})
	}
})

//edit duration yield
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

//add province
FlowRouter.route ('/addProvince' , {
	action : function (params, queryParams) {
		BlazeLayout.render ("mainLayout",{main : "AddProvince"})
	}
})

//edit province
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

//add city
FlowRouter.route ('/addCity/:province_id', {
	action : function (params, queryParams) {
		BlazeLayout.render("mainLayout", {main: "AddCity"})
	}
})

//edit city
FlowRouter.route ('/edit_city/:city_id/:province_id', {
	action: function (params, queryParams,queryParams2) {
		BlazeLayout.render("mainLayout", {main: "EditCity"})
	}
})

//viewing criteria
FlowRouter.route('/date/:awsID/:locationID', {
	action: function(params,queryParams,queryParams2){
		BlazeLayout.render("mainLayout", {main:"viewingCriteria"})
	}
})

//chart
FlowRouter.route ('/chart/:awsID/:date/:locationID/:cropTypes/:cropVariety', {
	action: function(params, queryParams,queryParams2,queryParams3,queryParams4) {
		BlazeLayout.render("mainLayout", {main: "ChartRainfall"})
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

//set up week no.
FlowRouter.route('/setUpWeek', {
	action: function(params,queryParams){
		BlazeLayout.render("mainLayout", {main:"weekNumber"})
	}
})

//edit week no
FlowRouter.route('/editWeek/:date_id', {
	action: function(params,queryParams) {
		BlazeLayout.render("mainLayout", {main: "editWeekNumber"})
	}
})


//register user
FlowRouter.route('/register', {
	action: function(params,queryParams) {
		BlazeLayout.render("mainLayout", {main : "register"})
	}
})

//login user
FlowRouter.route('/login', {
	action: function(params,queryParams){
		BlazeLayout.render("mainLayout", {main: "login"})
	}
})

//crop varieties
FlowRouter.route ('/cropVariety/:crop_id', {
	action: function(params,queryParams) {
		BlazeLayout.render("mainLayout", {main: "Varieties"})
	}
})


//add crop varieties
FlowRouter.route ('/addCropVariety/:crop_id', {
	action: function(params,queryParams) {
		BlazeLayout.render("mainLayout", {main: "AddVariety"})
	}
})

//edit crop variety
FlowRouter.route ('/editCropVariety/:variety_id/:crop_id', {
	action: function(params,queryParams) {
		BlazeLayout.render("mainLayout", {main: "EditCropVariety"})
	}
})



