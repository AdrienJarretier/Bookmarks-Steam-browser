'use strict';

async function get(uri) {

    try {

        const response = await fetch(uri, {
            method: 'GET',
        });

        return await response.json();

    } catch (e) {

        return [];

    }

}

async function post(uri, data) {

    const response = await fetch(uri, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response.json();

}

async function put(uri, data) {

    const response = await fetch(uri, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response.json();

}

async function sendDelete(uri, data) {

    const response = await fetch(uri, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    return await response.json();

}


function monitorEvents(element) {

    var log = function (e) { console.log(e); };
    var events = [];

    for (var i in element) {
        if (i.startsWith("on")) events.push(i.substr(2));
    }
    events.forEach(function (eventName) {
        element.addEventListener(eventName, log);
    });
}