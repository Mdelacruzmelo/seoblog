import React from 'react';
import Link from 'next/link'
import Layout from '../components/Layout';
import SigninComponent from '../components/auth/SigninComponent';

const Signin = () => {
    return (
        <Layout>
            <h2 className="text-center pt-4 pb-4">Signin page</h2>
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <SigninComponent />
                </div>
                <div className="col-md-6 offset-md-3">
                    Are you not a user?
                    <Link href="/signup">
                        <a>Signup</a>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}

export default Signin;