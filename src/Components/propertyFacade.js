import URL from '../settings'

function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json()
}

function makeOptions (method, body){
    var opts = {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
        }
    }
    if (body) {
        opts.body = JSON.stringify(body)
    }
    return opts
    }

function fetchPropertyData (){
        return fetch(URL + "api/properties/New York")// options)
        .then(handleHttpErrors)
        .catch((err) => {
            if (err.status) {
                err.fullError.then((e) => console.log(e.message))
            } else {
                console.log("Oh no")
            }
        })
    }

const propertyFacade = {
    fetchPropertyData,
    makeOptions
}

export default propertyFacade;
