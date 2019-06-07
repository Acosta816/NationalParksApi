'use strict';
let maxResults = 10;
let base =  'https://developer.nps.gov/api/v1/parks';
function formatQuery(params){
    let queryObject = Object.keys(params).map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`);
    let queryStringJoined = queryObject.join("&");
    return queryStringJoined;
}

function getParks(park, limit, state){
    // const options = { headers: new Headers(
    //     {"x-api-key": config.apiKey,
    //     "Accept": "*/*",
    //     "Cache-Control": "no-cache",
    //     "Postman-Token": "d882d874-2fc7-442f-803d-da8a7a2baf09,18f6664c-e3da-4e4f-8b6e-c5caf585f2c3",
    //     "Host": "developer.nps.gov",
    // })};

    function displayParks(jsonObject){
        let myHtml = ``;
        for(let i =0; i < jsonObject.data.length; i++){

            myHtml += `<h1>${jsonObject.data[i].fullName}</h1>
                        <h2>${jsonObject.data[i].designation}</h2>
                        <p>${jsonObject.data[i].description}</p>
                        <a href="${jsonObject.data[i].url}">visit website: ${jsonObject.data[i].url}</a>
                        <hr>`
        }

        return myHtml;
    }

    const params = {
        'stateCode': state,
        'q': park,
        limit,
        "api_key" : config.apiKey,
    }

    let queryString = formatQuery(params);
    console.log(queryString);

    let url = base+"?"+queryString;

    fetch(url)
    .then(response => response.json())
    .then(parkData => $('main').html(displayParks(parkData)));
}


function watchForm(){
    $('form').on('submit', event => {
        event.preventDefault();
        let park = $('#js-park-search').val();
        maxResults = $('#js-maxResults').val() -1;
        let state = $('#js-state').val();
        console.log(park + maxResults + state);
        getParks(park, maxResults, state);
    })
};




$(watchForm);