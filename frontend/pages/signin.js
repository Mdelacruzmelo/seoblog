import React from 'react';
import Link from 'next/link'
import Layout from '../components/Layout';

const Signin = () => {
    return (
        <Layout>
            <h2>Signin page</h2>
            <Link href="/signup">
                <a>Signup</a>
            </Link>
        </Layout>
    );
}

export default Signin;