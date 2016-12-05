/*jshint node:true, esnext: true, undef:true, unused: true*/

/*!
 * Meteor Boilerplate Code
 *
 * Copyright(c) Exequiel Ceasar Navarrete <development.lkexi@gmail.com>
 * Licensed under MIT
 */
'use strict';

import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { location } from '../../../lib/collections/locations.js'
import 'meteor/bevanhunt:leaflet';
import './map.html';

let map;
let miniMap;
let activeLocation;

let initMap = () => {
    let modal = $('#myModal');

    Meteor.call('get-all-location', (err, result) => {
        // get location data from the mongo db and add it to the map
        result.forEach((item) => {
            let marker = L.marker(item.mapLocation.coords);

            //listen for cick events in the market and oepn the popup once clock is detect
            marker.on('click', () =>{
                let province = item.province;
                let provinceFirstChar = province.charAt(0).toUpperCase();
                let capitalized = provinceFirstChar + item.province.substr(1);

                modal.find('.modal-title').text(capitalized);

                modal.find('#historical-yield .location').text(capitalized);

                setTimeout(() => {
                    modal.modal('show');
                }, 0);

                // store the active location
                activeLocation = item;
            });

            marker.addTo(map);
        });
    });

     modal.on('show.bs.modal', () => {

        $('#crop-form').on('submit', function(e) {
            // prevent the form from submitting automatically
            e.preventDefault();

            let date = $(this).find('#date');
            let type = $(this).find('#cropSelectionView');
            let variety = $(this).find('#cropVarietySelectionView');

            FlowRouter.go(`/chart/${activeLocation.awsID}/${date.val()}/${activeLocation._id}/${type.val()}/${variety.val()}`)
        });

        let dataProcessing = new Promise((resolve, reject) => {
            Meteor.call('get-crop-yields-by-location', activeLocation._id, (err, cropYields) => {
                resolve(cropYields);
            });
        });

        dataProcessing
            .then((cropYields) => {
                let html = '';

                cropYields.forEach((cropYield) => {
                    let cropType = cropYield.cropType;
                    let cropTypeFirstChar = cropType.charAt(0).toUpperCase();
                    let capitalized = cropTypeFirstChar + cropType.substr(1);

                    html += '<li>';
                    html += `<span>${capitalized}: </span>`;
                    html += `<span>${cropYield.cropYield} M.T./Ha</span>`;
                    html += '</li>';
                });

                modal
                    .find('.crop-yields')
                    .empty()
                    .html(html)
                    ;
            })
            ;
    });

    modal.on('shown.bs.modal', () => {
        // trigger resize event to make the map adjust the width and height to the dimensions of the modal
        miniMap.invalidateSize();

        // pan and zoom to the coordinates of the activeLocation
        miniMap.setView(activeLocation.mapLocation.coords, 10);
    });

    modal.on('hide.bs.modal', () => {
        $('#crop-form').off('submit');

        // remove the active location
        activeLocation = null;
    });

    // create minimap here
    miniMap = L.map('mini-map', {});

    // set the lat, long and zoom levels.
    miniMap.setView([13, 122], 6);

    // create the basemap tile layer
    var tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `Map data &copy; <a href="http://openstreetmap.org" target="_blank">
            OpenStreetMap</a> contributors`
    });

    // add the layer to the map
    tileLayer.addTo(miniMap);
};

Template.map.onCreated(() => {
   Meteor.subscribe('locations')
});


Template.map.rendered = () => {
    // create the map
    map = L.map('map', {});

    // set the lat, long and zoom levels.
    map.setView([13, 122], 6);

    // create the basemap tile layer
    var tileLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: `Map data &copy; <a href="http://openstreetmap.org" target="_blank">
            OpenStreetMap</a> contributors`
    });

    // add the layer to the map
    tileLayer.addTo(map);

    initMap();
};


