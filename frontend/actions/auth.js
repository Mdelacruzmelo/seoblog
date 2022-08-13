import fetch from 'isomorphic-fetch'
import { API } from '../config'

export const signup = (user) => {

    return fetch(`${API}/signup`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': 'true',
        },
        body: JSON.stringify(user)
    })
        .then((response) => {
            console.log('~ response.json()', response.json())
            return response.json()
        })
        .catch((err) => console.log(err))
}