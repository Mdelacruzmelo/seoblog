import React from 'react';
import Link from 'next/link'
import Layout from '../components/Layout';
import SignupComponent from '../components/auth/SignupComponent';

const Signup = () => {
    return (
        <Layout>
            <h2 className="text-center pt-4 pb-4">Sign page</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SignupComponent />
                </div>
                <div className="col-md-6 offset-md-3">
                    Are you a user?
                    <Link href="/signin">
                        <a>Signin</a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

export default Signup;