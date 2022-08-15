import fetch from 'isomorphic-fetch'
import {
    setCookie,
    deleteCookie,
    hasCookie
} from 'cookies-next';
import { API } from '../config'

// Signup
export const signup = (user) => {

    return fetch(`${API}/signup`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then((response) => response.json())
        .catch((err) => console.error(err))
}

// Signin
export const signin = (user) => {

    return fetch(`${API}/signin`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then((response) => response.json())
        .catch((err) => console.error(err))
}

// Signout
export const signout = (next) => {
    // deleteCookie('token')
    removeLocalStorage('token')
    removeLocalStorage('user')
    next()

    return fetch(`${API}/signout`, {
        method: 'GET'
    })
        .then((_response) => console.info('Signout success'))
        .catch((error) => console.error(`Signout failed: ${JSON.stringify(error)}`))
}

// Set Localstorage
export const setLocalStorage = (key, value, stringify) => {
    localStorage.setItem(key, (stringify ? JSON.stringify(value) : value))
}

// Remove Localstorage
export const removeLocalStorage = (key) => {
    localStorage.removeItem(key)
}

// Authenticate
export const authenticate = (data, next) => {
    // setCookie('token', data.token)
    setLocalStorage('token', data.token)
    setLocalStorage('user', data.user, true)
    if (next) next()
    else console.error("No next method given")
}

export const isAuth = () => {
    if (typeof window !== 'undefined') {
        // if (hasCookie('token')) {
        if (localStorage.getItem('token')) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
        // }
    }
}

export const getToken = () => {
    if (typeof window !== 'undefined') {
        // if (hasCookie('token')) {
        if (localStorage.getItem('token')) {
            return JSON.parse(localStorage.getItem('token'))
        } else {
            return false
        }

        // }
    }
}