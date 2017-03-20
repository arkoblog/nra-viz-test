var React = require('react');
var ReactDOM = require('react-dom')
var L = require('leaflet');
var polygons = require('../data/polygons');
var _ = require('lodash')
require('../styles/styles.css')

var baseMapUrl = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
var currentDistricts = ['nuwakot', 'sindhupalchowk', 'dolakha', 'gorkha', 'dhading']


var NepalMap = React.createClass({
    getInitialState: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 55;
        // console.log(maxWindowHeight)
        return {
            height: maxWindowHeight,
            isDistrictClicked: false
        }
    },

    componentWillMount: function() {
        var attributeData = this.attributeData = this._prepareAttributeData(this.props.data.percentageStats.regionalStats);
        var districtAttributes = this.districtAttributes = attributeData;

    },
    componentDidMount: function() {
        this._loadMap();
        window.addEventListener("resize", this._updateDimensions);
    },
    componentDidUpdate: function() {
        console.log("componentUpdated");
    },

    _updateDimensions: function() {
        var maxWindowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) - 55;
        this.setState({
            height: maxWindowHeight
        })
    },  

    _prepareAttributeData: function(data) {
        // console.log(data)S
        var attributeData = []
        _.forEach(data, function(value, key) {
            var object = {}
                // console.log(key, value)
            object.id = key.split("$")[1];
            object.name = key.split("$")[0];
            object.completion = value;
            attributeData.push(object)

        })
        // console.log(attributeData)
        return (attributeData)
            // if()

    },
    _loadMap: function() {
        var map = this.map = L.map(ReactDOM.findDOMNode(this)).setView([28.207, 85.992], 8);

        var baseLayer = L.tileLayer(baseMapUrl, {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <br> Website developed by <a target = "_blank" href="http://kathmandulivinglabs.org">Kathmandu Living Labs</a>'
        }).addTo(map);

        this._addDistricts();


        L.control.scale().addTo(map);

        var sidebar = L.control.sidebar('sidebar', { position: 'right' }).addTo(map);
        this.props.sidebarOpener(false);
        sidebar.open('home')

        map.on('zoomend', function() {
            if (map.getZoom() < 8) {
                this._removeLayers();
                this._addDistricts();
                this.props.onSelectionUpdate({ "district": "*", "vdc": "*" })

            }
        }.bind(this))
    },
    _addDistricts: function() {
        this._addLayer("nuwakot", "district");
        this._addLayer("gorkha", "district");
        this._addLayer("sindhupalchowk", "district");
        this._addLayer("dhading", "district");
        this._addLayer("dolakha", "district");
    },
    _onEachFeature: function(feature, layer) {
        layer.on({
            mouseover: this._highlightFeature,
            mouseout: this._resetHighlight,
            click: this._zoomToFeature
        });
    },

    _highlightFeature: function(e) {
            console.log(e.target.feature.properties.name)
        var customStyles = {
            'maxWidth': '300',
            'className' : 'custom',
            'closeButton' : false,
            'maxHeight':'20'
        }    

        var popup = L.popup(customStyles)
           .setLatLng(e.target.getCenter()) 
           .setContent("<div class=''>"+ e.target.feature.properties.name.toUpperCase()+" / " + e.target.feature.properties.completion+  "% COMPLETE</div>")
           .openOn(this.map);

          // e.target.bindPopup().addTo(this.map)
        // console.log("moseOver")
        var layer = e.target;

        layer.setStyle({
            weight: 2,
            color: '#005934',
            dashArray: '0',
            fillOpacity: 0.8
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
            layer.bringToFront();
        }
    },

    _resetHighlight: function(e) {

        var layer = e.target;
        layer.setStyle({
            weight: 0.5,
            opacity: 1,
            color: '#f8f8f8',
            dashArray: '0',
            fillOpacity: 0.8
        });
    },
    _afterFetchData: function() {
        // console.log("fetched", this.state.isDistrictClicked, this.state.selectedDistrict, this.props.data)
        if(this.state.isDistrictClicked == true) {

            this._removeLayers()
            this._addLayer(this.state.selectedDistrict, "vdc");
            this._addRemainingDistricts(this.state.selectedDistrict);
            this.setState({
                isDistrictClicked:false
            })
            
        }

    },

    _removeLayers: function() {
        this.map.eachLayer(function(layer) {
            if (layer._url != baseMapUrl) {
                this.map.removeLayer(layer)
            }
        }.bind(this))
    },

    _addRemainingDistricts: function(district) {

        this.districtAttributes.map(function(item) {
            // console.log(item);
            if (item.name != district) {
                this._addLayer(item.name, "district")
            }

        }.bind(this))
    },

    _zoomToFeature: function(e) {
        // console.log(e.target.feature)

        if (e.target.feature.properties.type) {
            var selectedDistrict = e.target.feature.properties.name.toLowerCase()
            var districtCode = String(e.target.feature.properties.DIST_ID)
            var districtName = String(e.target.feature.properties.name)


            // Reset state Variables
            var newParams = {};
            newParams.district = districtCode;
            newParams.vdc = "*"
            newParams.name = districtName
            
            this.map.setView(e.target.getCenter(), 9)


            this.setState({
                isDistrictClicked: true,
                selectedDistrict: selectedDistrict
            })

            this.props.onSelectionUpdate(newParams, this._afterFetchData);
            // console.log("data updated")
            // this._removeLayers()
            // this._addLayer(selectedDistrict, "vdc");
            // this._addRemainingDistricts(selectedDistrict);

        } else {
            var districtCode = String(e.target.feature.properties.DIST_ID)
            var vdcCode = String(e.target.feature.properties.code)
            var vdcName = String(e.target.feature.properties.name)

            var newParams = {};
            newParams.district = districtCode;
            newParams.vdc = vdcCode;
            newParams.name = vdcName;

            this.props.onSelectionUpdate(newParams, this._afterFetchData);
        }
    },
    _addLayer: function(id, level) {
        var layers = {
            districts: {
                dhading: L.geoJSON(polygons.districts.dhading, { style: this._styleDistrict, onEachFeature: this._onEachFeature }),
                gorkha: L.geoJSON(polygons.districts.gorkha, { style: this._styleDistrict, onEachFeature: this._onEachFeature }),
                sindhupalchowk: L.geoJSON(polygons.districts.sindhupalchowk, { style: this._styleDistrict, onEachFeature: this._onEachFeature }),
                dolakha: L.geoJSON(polygons.districts.dolakha, { style: this._styleDistrict, onEachFeature: this._onEachFeature }),
                nuwakot: L.geoJSON(polygons.districts.nuwakot, { style: this._styleDistrict, onEachFeature: this._onEachFeature })
            },
            vdcs: {
                dhading: L.geoJSON(polygons.vdcs.dhading, { style: this._styleVdc, onEachFeature: this._onEachFeature }),
                gorkha: L.geoJSON(polygons.vdcs.gorkha, { style: this._styleVdc, onEachFeature: this._onEachFeature }),
                sindhupalchowk: L.geoJSON(polygons.vdcs.sindhupalchowk, { style: this._styleVdc, onEachFeature: this._onEachFeature }),
                dolakha: L.geoJSON(polygons.vdcs.dolakha, { style: this._styleVdc, onEachFeature: this._onEachFeature }),
                nuwakot: L.geoJSON(polygons.vdcs.nuwakot, { style: this._styleVdc, onEachFeature: this._onEachFeature })
            }
        };





        switch (level) {

            case "district":
                var newLayer = this._joinMapData(layers.districts[id], "district")
                var newStyles = this._styleDistrict(newLayer._layers[Object.keys(newLayer._layers)[0]].feature)
                for (var key in newStyles) {
                    newLayer._layers[Object.keys(newLayer._layers)[0]].options[key] = newStyles[key]
                }
                newLayer.addTo(this.map);
                break;
            case "vdc":
                // console.log(id)
                var newLayer = this._joinMapData(layers.vdcs[id], "vdc")
                for (var key in newLayer._layers) {
                    var newStyle = this._styleVdc(newLayer._layers[key].feature)
                    for (var styleKey in newStyle) {
                        newLayer._layers[key].options[styleKey] = newStyle[styleKey]
                    }
                }
                console.log("MyNew",newLayer)
                newLayer.addTo(this.map);
                break;
            default:
                console.log("default response");
        }

        // console.log("added layer",id, level )

    },

    _joinMapData: function(layerJSON, level) {
        // console.log("joinedData", layerJSON, level)
        // console.log("data",this.props.data.percentageStats.regionalStats)
        var dataArray = this._prepareAttributeData(this.props.data.percentageStats.regionalStats);
        var currentFeature;
        switch (level) {
            case "district":
                currentFeature = layerJSON._layers[Object.keys(layerJSON._layers)[0]].feature
                // var dataArray = this.attributeData
                dataArray.map(function(district) {
                    if (district.id == currentFeature.properties.DIST_ID) {
                        currentFeature.properties.completion = district.completion
                    }
                })
                layerJSON._layers[Object.keys(layerJSON._layers)[0]].feature = currentFeature
                return (layerJSON);

            case "vdc":
                // console.log(dataArray)
                // console.log(layerJSON._layers)
                // var dataArray = this.attributeData;
                for (var item in layerJSON._layers) {

                    // console.log(item)
                    currentFeature = layerJSON._layers[item].feature
                    dataArray.map(function(vdc) {
                        if (vdc.id == currentFeature.properties.code) {
                            currentFeature.properties.completion = vdc.completion
                        }
                    })
                    layerJSON._layers[item].feature = currentFeature;

                };
                    return (layerJSON);

            default:
                break;
        }
        // console.log(currentFeature)
    },
    _getColor: function(d, type) {
        if (type == "district") {
            return d > 80 ? '#043d2e' :
                d > 60 ? '#155948' :
                d > 40 ? '#2a715f' :
                d > 20 ? '#4b8b7b' :
                '#75a79b';
        } else {
            return d > 80 ? '#043d2e' :
                d > 60 ? '#155948' :
                d > 40 ? '#2a715f' :
                d > 20 ? '#4b8b7b' :
                '#75a79b';
        }


    },
    _styleDistrict: function(feature) {
        // console.log("District:",feature);
        return {
            fillColor: this._getColor(feature.properties.completion, "district"),
            weight: 1,
            opacity: 1,
            color: '#f8f8f8',
            dashArray: '0',
            fillOpacity: 0.8
        };
    },
    _styleVdc: function(feature) {
        return {
            fillColor: this._getColor(feature.properties.completion, "vdc"),
            weight: 1,
            opacity: 1,
            color: '#f8f8f8',
            dashArray: '0',
            fillOpacity: 0.8
        };
    },

    render: function() {
        return (
            <div>
                {this.props.children}
                <div id="map" className = "sidebar-map" style={{height:this.state.height}}>
                </div>
            </div>
        )
    }
})

module.exports = NepalMap
