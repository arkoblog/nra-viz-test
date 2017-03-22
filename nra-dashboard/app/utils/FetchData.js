var React = require('react');
var axios = require('axios');

var rootURL = 'http://localhost:3000'
var rootURLActual = 'http://139.59.227.15:8848'
var rooURLLocal = 'http://192.168.1.11:8848'


var fetchData = function(params) {
    return axios({
        method: 'get',
        url: rootURLActual + '/api/v1/mis/region/records',
        params: params
    })
}


var fetchModalData = function(params) {
    return axios({
        method: 'get',
        url: rootURL + '/data',
        params: params
    })
}

var fetchModalData2 = function(params) {
    return axios({
        method: 'get',
        url: rootURLActual + '/api/v1/mis/assessment/queries',
        params: params
    })
}

// fetchModalData2({   "district":"*","vdc" : "*","assessmentId" : "1"}).then(function(response){
//     console.log(response)
// })

module.exports = {fetchData:fetchData,
fetchModalData: fetchModalData2};
