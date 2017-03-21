var React = require('react');
var ReactDOM = require('react-dom');
var d3 = require('d3');
var c3 = require('c3');
var _ = require('lodash')

var chartHeight = screen.height * 0.25;
var modalchartHeight = screen.height * 0.5;

var LineAreaBar = React.createClass({
    componentWillMount: function() {
        this._updateChart();
    },
    componentDidMount: function() {
        this._updateChart();
    },
    componentDidUpdate: function() {
        this._updateChart();
    },
    _updateChart: function() {
        var labels = this.props.columns[0]
            // console.log("MyColumns", this.props.columns[0])
        c3.generate({
            bindto: '#' + this.props.id,
            data: {
                columns: [this.props.columns[1]],
                type: this.props.chartType,
                colors: {
                    yaxis: '#4484ce'
                },
                labels: {
                    format: function(v, id, i, j) {
                        return labels[i] == "" ? "" : labels[i] + " / " + v + "%" },
                }
            },
            axis: {
                x: {
                    show: false
                },
                y: {
                    show: false
                },
                rotated: true
            },
            legend: {
                show: false
            },
            tooltip: {
                show: false
            },
            size: {
                height: chartHeight
            }
        });
    },
    render() {
        return <div id={this.props.id} ref="refName" ></div>;
    }
});

var Bar = React.createClass({
    componentWillMount: function() {
        this._updateChart();
    },
    _formatData: function(data) {
        var formattedData = []
        _.forEach(data, function(value, key) {
            var emptyObject = {}
            emptyObject.title = key;
            emptyObject.value = value;
            emptyObject.percentage = Number(this.props.values[key])
            formattedData.push(emptyObject)

        }.bind(this))
        return formattedData;
    },
    componentDidMount: function() {
        this._updateChart();
    },
    componentDidUpdate: function() {
        this._updateChart();
    },
    _chartHeight: function() {
        chartHeight = screen.height * 0.10;
        var length = Object.keys(this.props.percentageData).length
        chartHeight = chartHeight * length / 3
    },
    _updateChart: function() {
        var myChartData = this._formatData(this.props.percentageData);
        var myValues = _.values(this.props.values)
        this._chartHeight()
        var labels = _.map(myChartData, "title")

        c3.generate({
            bindto: '#' + this.props.id,
            data: {
                json: myChartData,
                keys: {
                    x: 'title', // it's possible to specify 'x' when category axis
                    value: ['value'],
                },
                type: "bar",
                labels: {
                    format: function(v, id, i, j) {
                        return labels[i] == "dummy" ? "" : labels[i] + " / " + v + "%" },
                    // + " / " + myValues[i]  
                }
            },
            color: {
                pattern: ['#4484ce']
            },
            axis: {
                rotated: true,
                x: {
                    show: false,
                    type: 'category'
                },
                y: {
                    show: false,
                    max: 100
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                contents: function(d, defaultTitleFormat, defaultValueFormat, color, index) {
                    return "<div class='test' style='font-size:10px;padding:10px;background-color:rgb(245,245,245)'><font color='#4484ce'>" + labels[d[0].index] + "<br/>" + myValues[d[0].index] + " / " + d[0].value + "% </font></div>";
                }
            },
            size: {
                height: chartHeight
            }
        });
    },
    render() {
        return <div id={this.props.id} className="" ref="refName" ></div>;
    }
});


var StackedBar = React.createClass({
    componentWillMount: function() {
        this._updateChart();
    },
    componentDidMount: function() {
        this._updateChart();
    },
    componentDidUpdate: function() {
        this._updateChart();
    },
    _updateChart: function() {
        // console.log("MyColumns", this.props.columns[0])
        c3.generate({
            bindto: '#' + this.props.id,
            data: {
                columns: [
                    ['data1', 25],
                    ['data2', 65],
                    ['data3', 10]
                ],
                type: this.props.chartType,
                colors: {
                    yaxis: '#29BF9A'
                },
                groups: [
                    ['data1', 'data2', 'data3']
                ],
                labels: true
            },
            axis: {
                x: {
                    show: false
                },
                y: {
                    show: false
                },
                rotated: true
            },
            legend: {
                show: true
            },
            tooltip: {
                show: false
            },
            size: {
                height: chartHeight
            }
        });
    },
    render() {
        return <div id={this.props.id} ref="refName" ></div>;
    }
});

var ClusteredColumn = React.createClass({
    componentWillMount: function() {
        this._updateChart();
    },
    componentDidMount: function() {
        this._updateChart();
    },
    componentDidUpdate: function() {
        this._updateChart();
    },
    _updateChart: function() {
        // console.log("MyColumns", this.props.columns[0])
        c3.generate({
            bindto: '#' + this.props.id,
            data: {
                columns: this.props.data,
                type: this.props.chartType,
                colors: {
                    yaxis: '#29BF9A'
                },

                labels: true
                    //         labels: {
                    //            format: function (v, id, i, j) { return labels[i]==""? "" : labels[i] + " / "+v + "%"},
                    // //             format: {
                    // //                 data1: d3.format('$'),
                    // // //                data1: function (v, id, i, j) { return "Format for data1"; },
                    // //             }
                    //         } 
            },
            axis: {
                x: {
                    show: false
                },
                y: {
                    show: false
                },
                rotated: true
            },
            color: {
                pattern: ['#29BF9A', '#2B8779', '#195148']
            },
            legend: {
                show: true
            },
            tooltip: {
                show: false
            },
            size: {
                height: modalchartHeight
            }
        });
    },
    render() {
        return <div id={this.props.id} ref="refName" ></div>;
    }
});

var Scatter = React.createClass({
    componentDidMount: function() {
        this._updateChart();
    },
    componentDidUpdate: function() {
        this._updateChart();
    },
    _updateChart: function() {
        // console.log("MyColumns", this.props.columns)
        chart = c3.generate({
            bindto: '#' + this.props.id,
            data: {
                x: this.props.columns[0][0],
                columns: this.props.columns,
                type: 'scatter',
                labels: {
                    //            format: function (v, id, i, j) { return "Default Format"; },
                    format: function(v, id, i, j) {
                        return d3.round(v, 2);
                        //                data1: function (v, id, i, j) { return "Format for data1"; },
                    }
                }
            },
            point: {
                r: 10
            },
            axis: {
                x: {
                    label: this.props.columns[0][0],
                    tick: {
                        fit: false
                    }
                },
                y: {
                    label: this.props.columns[1][0]
                }
            }
        });
    },
    render() {
        return <div id={this.props.id} ></div>;
    }
});


module.exports = {
    LineAreaBar: LineAreaBar,
    Scatter: Scatter,
    StackedBar: StackedBar,
    ClusteredColumn: ClusteredColumn,
    Bar: Bar
};
