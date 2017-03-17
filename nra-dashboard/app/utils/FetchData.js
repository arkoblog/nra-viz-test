var React = require('react');
var axios = require('axios');

var rootURL = 'http://localhost:3000'


var fetchChartData = function(params) {
    return axios({
        method: 'get',
        url: rootURL + '/chartData',
        params: params
    })
}


var fetchMapAttributes = function(params) {
    return axios({
        method: 'get',
        url: rootURL + '/mapAttributes',
        params: params
    })
}


// fetchMapAttributes({id:0, level:"all"}).then(function(response){
//     console.log("MapAttributes:",response.data[0].data)
// })


var fetchData = {
    getChart : function(params){
        var myInsights = fetchChartData(params);
        return axios.all([myInsights])
            .then(function(response){
                var array = response[0].data[0].data;
                if(response[0].data[0].data.installment_status.length==2) {
                    array.installment_status.push({"title":"dummy","value":0})
                }
                return (array)
            }).catch(function(err){
                console.warn('Error in getChart:', err)
            })
    },
    getMapAttributes : function(params) {
        var myAttributes = fetchMapAttributes(params);
        return axios.all([myAttributes])
            .then(function(response){
                return response[0].data[0].data;
            }).catch(function(err){
                console.warn('Error in getChart:', err)
            })

    }
}




module.exports = fetchData;
