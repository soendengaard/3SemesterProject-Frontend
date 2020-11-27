const URL = "https://realtor.p.rapidapi.com/properties/v2/list-for-sale"



function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json()
}

function getAllProperties(){
    //console.log(fetch(URL))
    return fetch(URL) 
    .then(handleHttpErrors)
}

const propFacade = {
    getAllProperties,
}



export default propFacade;
