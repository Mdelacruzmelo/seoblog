import fetch from 'isomorphic-fetch'
import Cookies from 'js-cookie'
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

// Set cookie
export const setCookie = (key, value) => {

    if (typeof window === 'undefined') {
        Cookies.set(key, value, {
            expired: 1
        })
    }
}

// Remove cookie
export const removeCookie = (key) => {
    if (typeof window === 'undefined') {
        Cookies.remove(key)
    }
}

// Get cookie
export const getCookie = (key) => {
    if (typeof window === 'undefined') {
        Cookies.get(key)
    }
}

// Set Localstorage
export const setLocalStorage = (key, value) => {
    if (typeof window === 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
}

// Remove Localstorage
export const removeLocalStorage = (key) => {
    if (typeof window === 'undefined') {
        localStorage.removeItem(key)
    }
}

// Autehnticate user by pass data to cookie and localstorage
export const authenticate = (data, next) => {

    setCookie('token', data.token)
    setLocalStorage('user', data.user)
    if (next) next()
    else console.error("No next method given")
}

export const isAuth = () => {

    if (typeof window === 'undefined') {
        if (getCookie('token')) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'))
            } else {
                return false
            }
        }
    }

}