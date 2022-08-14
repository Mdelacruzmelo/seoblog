import React, { useState } from 'react'
import { signin, authenticate } from '../../actions/auth'
import Router from 'next/router'

const SigninComponent = () => {

    const [values, setValues] = useState({
        email: 'mdela2@gmail.com',
        password: '123456789Mar',
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
                if (data?.error) {
                    setValues({ ...values, error, loading: false })
                } else {
                    // Save the user to cookie,
                    // Saave user to local storage
                    // authenticate the user
                    authenticate(data, () => { Router.push(`/`) })

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