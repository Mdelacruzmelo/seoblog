import { useEffect } from 'react'
import Router from 'next/router'
import { isAuth } from '../../actions/auth'

const Admin = ({ children }) => {

    useEffect(() => {
        if (!isAuth()) {
            Router.push('/signin')
        } else if (isAuth().role !== 1) {
            Router.push('/user')
        }
    }, [])

    return (
        <>
            <span>Admin</span>
            {children}
        </>
    );
}

export default Admin;