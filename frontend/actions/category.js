import { API } from '../config'

export const getCategories = () => {

    return fetch(`${API}/categories`, {
        method: 'get',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify()
    })
        .then((response) => response.json())
        .catch((err) => console.error(err))
}

export const createCategory = (category, token) => {
    return fetch(`${API}/category`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    })
        .then((response) => response.json())
        .catch((err) => console.error(err))
}

export const removeCategory = (slug, token) => {

    return fetch(`${API}/category/${slug}`, {
        method: 'delete',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify()
    })
        .then((response) => response.json())
        .catch((err) => console.error(err))
}
