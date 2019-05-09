const baseURL = "http://localhost:8088"

const API = {
    getAll(path, userId){
        return fetch(`${baseURL}/${path}?userId=${userId}`)
        .then(e => e.json())
    },
    getAllUsers(){
        return fetch(`${baseURL}/users`)
        .then(e => e.json()) 
    },
    getAllUsersImages(){
        return fetch(`${baseURL}/users?_embed=images`)
        .then(e => e.json())
    },
    getOne(path, id){
        return fetch(`${baseURL}/${path}/${id}`)
        .then(e => e.json())
    },
    getFriendsUserId(userId){
        return fetch(`${baseURL}/friends?currentUserId=${userId}&_expand=user`)
        .then(e => e.json())
    },
    getFriendsImage(userId){
        return fetch(`${baseURL}/images?_expand=user&userId=${userId}`)
        .then(e => e.json())
    },
    updateEntry(obj, path){
        return fetch(`${baseURL}/${path}/${obj.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
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