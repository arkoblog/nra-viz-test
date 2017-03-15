var React = require('react');
var ReactDOM = require('react-dom')
var L = require('leaflet');
// var $ = require('jquery');
var VDC = require('../data/five_districts');
// var turfDissolve = require('@turf/dissolve');
// var turfCombine = require('@turf/combine');
// var turfCollect = require('@turf/collect');
// var turfFlatten = require('@turf/flatten');
// var turfUnion = require('@turf/union');
// var _ = require('lodash');
var jsts = require("jsts");


VDC.vdc.features.map(function (item) {item.properties.total_surveys=Math.random() * (500 - 200) + 200;})




var Body = React.createClass({
    getInitialState: function() {
        return {
            height: "94.5vh"
        }
    },
    getMapPolygons: function(level, id) {
    },
    loadMap: function() {
		var map = this.map = L.map(ReactDOM.findDOMNode(this)).setView([28.207, 85.992], 8);
      	
      	L.tileLayer('http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <br> Website developed by <a target = "_blank" href="http://kathmandulivinglabs.org">Kathmandu Living Labs</a>'
        }).addTo(map);

        function getColor(d) {
            return d > 500 ? '#00734E' :
                   d > 400  ? '#008C67' :
                   d > 300  ? '#10A681' :
                   d > 200  ? '#29BF9A' :
                   d > 100   ? '#43D9B4' :
                   d > 50   ? '#5CF2CD' :
                   d > 10   ? '#76FFE7' :
                              '#8FFFFF';
        }

        function style(feature) {
            return {
                fillColor: getColor(feature.properties.total_surveys),
                weight: 1,
                opacity: 1,
                color: '#f8f8f8',
                dashArray: '2',
                fillOpacity: 0.6
            };
        }

        function styleDistrict(feature) {
            return {
                fillColor: getColor(feature.properties.total_surveys),
                weight: 1,
                opacity: 1,
                color: '#f8f8f8',
                dashArray: '1',
                fillOpacity: 0.6
            };
        }

        // $.getJSON("../data/districts.geojson", function(data) { console.log(data) });


        function highlightFeature(e) {
            var layer = e.target;

            layer.setStyle({
                weight: 2,
                color: '#005934',
                dashArray: '',
                fillOpacity: 0.7
            });

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }
        }

        function resetHighlight(e) {
            var layer = e.target;


            layer.setStyle({
                weight: 1,
                opacity: 1,
                color: '#f8f8f8',
                dashArray: '2',
                fillOpacity: 0.6
            });
        }

        function zoomToFeature(e) {
            console.log((e.target.getBounds()))
            console.log(e.target.getCenter())
            // map.fitBounds(e.target.getBounds());
            map.setView(e.target.getCenter(), 9)
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature
            });
        }



        var polygons = L.geoJSON(VDC.vdc, {style:style, onEachFeature:onEachFeature}).addTo(map);
        var polygons1 = L.geoJSON(VDC.novdc, {style:styleDistrict, onEachFeature:onEachFeature}).addTo(map);


        map.on('zoomend', function() {
            console.log("Current Zoom Level:", map.getZoom())
            if (map.getZoom()<9){
                if (map.hasLayer(polygons)) {
                    map.removeLayer(polygons);
                    map.addLayer(polygons1);
                } else {
                    map.addLayer(polygons1)
                    console.log("no point layer active");
                }
            }
            if (map.getZoom() >= 9){
                if (map.hasLayer(polygons)){
                    map.removeLayer(polygons1)
                    console.log("layer already added");

                } else {
                    map.addLayer(polygons);

                }
            }
        })

    },
    componentDidMount: function() {
        this.loadMap();
    },
	render: function () {
		return (
			<div>
				<div id="map" className = "sidebar-map" style={{height:this.state.height}}>
				</div>
			</div> 
		)
	}
})

module.exports = Body