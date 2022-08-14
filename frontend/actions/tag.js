import { API } from '../config'

export const getTags = () => {

    return fetch(`${API}/tags`, {
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

export const create = (tag, token) => {
    return fetch(`${API}/tag`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(tag)
    })
        .then((response) => response.json())
        .catch((err) => console.error(err))
}

export const removeTag = (slug, token) => {

    return fetch(`${API}/tag/${slug}`, {
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

