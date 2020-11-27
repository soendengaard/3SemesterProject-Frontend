const URL = "http://localhost:8080//sem3backend/api/properties/"



function handleHttpErrors(res) {
    if (!res.ok) {
        return Promise.reject({ status: res.status, fullError: res.json() })
    }
    return res.json()
}

function getAllProperties(){
    return fetch(URL + "all") 
    .then(handleHttpErrors)
}

const propFacade = {
    getAllProperties,
}



export default propFacade;
