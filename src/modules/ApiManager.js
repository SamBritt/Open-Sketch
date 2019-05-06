const baseURL = "http://localhost:8088"

const API = {
    getAll(path){
        return fetch(`${baseURL}/${path}`)
        .then(e => e.json())
    },
    getOne(path, id){
        return fetch(`${baseURL}/${path}/${id}`)
        .then(e => e.json())
    },
    postEntry(obj, path) {
        return fetch(`${baseURL}/${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        }).then(e => e.json())
    },
    deleteEntry(path, id){
        return fetch(`${baseURL}/${path}/${id}`, {
            method: "DELETE"
        })
    }
}
export default API