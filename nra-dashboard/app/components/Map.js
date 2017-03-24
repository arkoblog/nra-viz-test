var React = require('react');
var ReactDOM = require('react-dom')
var L = require('leaflet');
var polygons = require('../data/polygons');
var npl_boundary = require('../data/npl_boundary');
var _ = require('lodash')
require('leaflet-boundary-canvas')
require('../styles/styles.css');

// var baseMapUrl = 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
// var baseMapUrl = 'http://korona.geog.uni-heidelberg.de/tiles/roadsg/x={x}&y={y}&z={z}'
// var baseMapUrl = 'https://api.mapbox.com/styles/v1/arkoblog/cj0nbcvov00bf2snztyypiyg5/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYXJrb2Jsb2ciLCJhIjoiY2l5MmczdzJyMDAxODJxcDY5NHMyeHpkMyJ9.la6WiYXrUzF1Iy4aST9tnA'
var baseMapUrl2 = 'https://raw.githubusercontent.com/jedi-Knight/Maps-of-Nepal/v2/nepal-districts-vdcs/{z}/{x}/{y}.png'
var currentDistricts = ['nuwakot', 'sindhupalchowk', 'dolakha', 'gorkha', 'dhading']
var baseMapUrl = 'https://tiles.wmflabs.org/osm-no-labels/{z}/{x}/{y}.png'

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
        // this.map.spin(true)
        window.addEventListener("resize", this._updateDimensions);
    },
    componentDidUpdate: function() {

        // console.log("componentUpdated");
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


        var osm = L.TileLayer.boundaryCanvas(baseMapUrl, {
            boundary: npl_boundary
        }).addTo(map);
        var baseLayer = L.tileLayer(baseMapUrl2, {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors <br> Website developed by <a target = "_blank" href="http://kathmandulivinglabs.org">Kathmandu Living Labs</a>'
        }).addTo(map);
        // var baseLayer = L.tileLayer(baseMapUrl2, {
        // }).addTo(map);
        

        this._addDistricts();



        L.control.scale().addTo(map);

        var sidebar = L.control.sidebar('sidebar', { position: 'right' }).addTo(map);
        this.props.sidebarOpener(false);
        sidebar.open('home')

        // console.log(sidebar)
        sidebar._sidebar.addEventListener('mouseover', function () {
            map.dragging.disable();
        })

        sidebar._sidebar.addEventListener('mouseout', function () {
            map.dragging.enable();
        })


        var legend = L.control({position: 'bottomleft'});

        legend.onAdd = function (map) {

            var div = L.DomUtil.create('div', 'info legend'),
                grades = [80, 60, 40, 20, 0],
                labels = ["More than 80%", "60% to 80%", "40% to 60%",  "20% to 40%", "Less than 20%" ];


            // loop through our density intervals and generate a label with a colored square for each interval
            div.innerHTML += '<div class="legend-description">total beneficiaries surveyed</div>'
            for (var i = 0; i < grades.length; i++) {
                div.innerHTML +=
                    '<div class="legend-parent"><i class="legend-icon fa fa-circle"  style = " color: ' + this._getColor(grades[i] + 1) + ' " aria-hidden="true"></i>   <span class="legend-label">'+ labels[i] + '</span><br/></div>';
            }
            // console.log(div)
            return div;
        }.bind(this);

        legend.addTo(map);


        map.on('zoomend', function() {
            if (map.getZoom() < 9) {
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
            // console.log(e.target.feature.properties.name)
        var customStyles = {
            'maxWidth': '300',
            'className' : 'custom',
            'closeButton' : false,
            'maxHeight':'20'
        }    
        
        if(this.props.config.allowPointer == "auto") {
            var popup = L.popup(customStyles)
               .setLatLng(e.target.getCenter()) 
               .setContent("<div class=''>"+ e.target.feature.properties.name.toUpperCase()+" / " + e.target.feature.properties.completion+  "% BENEFICIARIES SURVEYED</div>")

               this.map.openPopup(popup)
              // e.target.bindPopup().addTo(this.map)
            // console.log("moseOver")
            var layer = e.target;
            if(e.target.feature.properties.name != this.state.selectedDistrict) {
                if(e.target.feature.properties.name != this.state.selectedVdc) {
                        layer.setStyle({
                            weight: 1,
                            color: 'rgba(0,0,0,0.7)',
                            dashArray: '0',
                            fillOpacity: 0.8
                        });
                    
                }
            }

            if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                layer.bringToFront();
            }

        } 
    },

    _resetHighlight: function(e) {
        this.map.closePopup()


        var layer = e.target;
            if(e.target.feature.properties.name != this.state.selectedDistrict) {
                if(e.target.feature.properties.name != this.state.selectedVdc) {
                    if (e.target.feature.properties.type ) {
                        layer.setStyle({
                            weight: 0.5,
                            opacity: 1,
                            color: '#888',
                            dashArray: '0',
                            fillOpacity: 0.8
                        });
                    }
                    
                }
            }


    },
    _afterFetchData: function() {
        // console.log("fetched", this.state.isDistrictClicked, this.state.selectedDistrict, this.props.data)
        if(this.state.isDistrictClicked == true) {

            this._removeLayers()
            this._addRemainingDistricts(this.state.selectedDistrict);
            this._addLayer(this.state.selectedDistrict, "vdc");
            this.setState({
                isDistrictClicked:false
            })
            
        }

    },

    _removeLayers: function() {
        this.map.eachLayer(function(layer) {
            if (layer._url != baseMapUrl) {
                if (layer._url != baseMapUrl2) {
                 this.map.removeLayer(layer)
                } 
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

    _resetStyles: function(layers){
            var key = Object.keys(layers)[0]
            // console.log(layers[key]._layers)
            var layers = layers[key]._layers
            for (var item in layers) {
                console.log(layers[item])
                layers[item].setStyle({
                    weight: 1,
                    opacity: 1,
                    color: '#000',
                    dashArray: '0',
                    fillOpacity: 0.8
                });

            }
                        // layer.setStyle({
                        //     weight: 0.5,
                        //     opacity: 1,
                        //     color: '#888',
                        //     dashArray: '0',
                        //     fillOpacity: 0.8
                        // });
    },

    _zoomToFeature: function(e) {



        // console.log(e.target.feature)
        if(this.props.config.allowPointer == "auto") {
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


            } else {
                var districtCode = String(e.target.feature.properties.DIST_ID)
                var vdcCode = String(e.target.feature.properties.code)
                var vdcName = String(e.target.feature.properties.name)


                this.setState({
                    selectedVdc: vdcName
                })

                var newParams = {};
                newParams.district = districtCode;
                newParams.vdc = vdcCode;
                
                    // console.log(e.target)

                var layer = e.target

                this._resetStyles(layer._eventParents)

                layer.setStyle({
                            weight: 3.5,
                            opacity: 1,
                            color: '#b34100',
                            dashArray: '0',
                            fillOpacity: 0.8
                });

                newParams.name = vdcName;

                this.props.onSelectionUpdate(newParams, this._afterFetchData);
            }
            
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

                newLayer.setStyle({
                    weight: 1,
                    opacity: 1,
                    color: '#000',
                    dashArray: '0',
                    fillOpacity: 0.8
                });
                // console.log("MyNew",newLayer)
                newLayer.addTo(this.map);
                break;
            default:
                console.log("default response");
        }

        // console.log("added layer",id, level )

    },

    _joinMapData: function(layerJSON, level) {
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
            return d > 80 ? '#053064' :
                d > 60 ? '#0b4fa1' :
                d > 40 ? '#4483ce' :
                d > 20 ? '#6494ce' :
                '#95bceb';
        } else {
            return d > 80 ? '#053064' :
                d > 60 ? '#0b4fa1' :
                d > 40 ? '#4483ce' :
                d > 20 ? '#6494ce' :
                '#95bceb';
        }


    },
    _styleDistrict: function(feature) {
        // console.log("District:",feature);
        return {
            fillColor: this._getColor(feature.properties.completion, "district"),
            weight: 0.5,
            opacity: 1,
            color: '#888',
            dashArray: '0',
            fillOpacity: 0.8
        };
    },
    _styleVdc: function(feature) {
        return {
            fillColor: this._getColor(feature.properties.completion, "vdc"),
            weight: 0.5,
            opacity: 1,
            color: '#888',
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
