import React, { useState } from 'react'
import { signup } from '../../actions/auth'

const SignupComponent = () => {

    const [values, setValues] = useState({
        name: 'Mario',
        email: 'mdela2@gmail.com',
        password: '123456789Mar',
        error: '',
        loading: false,
        message: '',
        showForm: true,
    })

    const { name, email, password, error, loading, message, showForm } = values
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: false, loading: true })
        signup({ name, email, password })
            .then((data) => {
                if (data?.error) {
                    setValues({ ...values, error, loading: false })
                } else {
                    setValues({
                        ...values,
                        name: '',
                        email: '',
                        password: '',
                        loading: false,
                        error: '',
                        message: data?.message,
                        showForm: false,
                    })
                }
            })
    }
    const handleChange = name => e => {
        setValues({ ...values, [name]: e.target.value })
    }
    const showLoading = () => (loading ? <div className="aler alert-info">Loading...</div> : '')
    const showError = () => (error ? <div className="aler alert-danger">{error}</div> : '')
    const showMessage = () => (message ? <div className="aler alert-info">{message}</div> : '')
    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input
                        value={name}
                        onChange={handleChange('name')}
                        type="text"
                        className="form-control"
                        placeholder="Type your name" />
                </div>
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
                    <button className="btn btn-primary">Signup</button>
                </div>

            </form>
        )
    }

    return (
        <>
            {showError()}
            {showLoading()}
            {showMessage()}
            {showForm && signupForm()}
        </>
    );
}

export default SignupComponent;