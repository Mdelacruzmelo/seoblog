import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { signin, authenticate } from '../../actions/auth'
import { isAuth } from '../../actions/auth'

const SigninComponent = () => {

    useEffect(() => {
        isAuth() && Router.replace('/')
    }, [])

    const [values, setValues] = useState({
        email: 'mdelacruzmelo@gmail.com',
        password: '123456',
        error: '',
        loading: false,
        message: '',
        showForm: true,
    })
    const { email, password, error, loading, message, showForm } = values
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signin({ email, password })
            .then((data) => {
                if (!data) {
                    setValues({ ...values, error: 'Could not create a user', loading: false })
                } else if (data?.error) {
                    setValues({ ...values, error: data?.error, loading: false })
                } else {
                    authenticate(data, () => {
                        if (isAuth() && isAuth().role === 1) {
                            Router.push('/admin')
                        } else {
                            Router.push('/user')
                        }
                    })
                }
            })
    }
    const handleChange = field => e => {
        setValues({ ...values, [field]: e.target.value })
    }
    const showLoading = () => (loading ? <div className="aler alert-info">Loading...</div> : '')
    const showError = () => (error ? <div className="aler alert-danger">{error}</div> : '')
    const showMessage = () => (message ? <div className="aler alert-info">{message}</div> : '')
    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={email}
                        onChange={handleChange('email')}
                        type="email"
                        className="form-control"
                        placeholder="Type your email" />
                </div>
                <div className="form-group">
                    <input
                        value={password}
                        onChange={handleChange('password')}
                        type="password"
                        className="form-control"
                        placeholder="Type your password" />
                </div>

                <div>
                    <button className="btn btn-primary">Signin</button>
                </div>

            </form>
        )
    }

    return (
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signinForm()}
        </>
    );
}

export default SigninComponent;