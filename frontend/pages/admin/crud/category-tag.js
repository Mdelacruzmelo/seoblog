import { useState, useEffect } from 'react';
import Link from 'next/link'
import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'
import Category from '../../../components/crud/Category'
import Tag from '../../../components/crud/Tag'
import { getToken } from '../../../actions/auth';

const CategoryTag = () => {

    const [token, setToken] = useState()

    useEffect(() => {
        setToken(localStorage.getItem('token'))
    }, [])

    return (
        <Layout>
            <Admin>
                <div className="row">
                    <div className="col-md-12 pt-5 pb-5">
                        <h3>Manage Categories and Tags</h3>
                    </div>
                    <div className="col-md-6">
                        <Category token={token} />
                    </div>
                    <div className="col-md-6">
                        <Tag token={token} />
                    </div>
                </div>
            </Admin>
        </Layout >
    );
}

export default CategoryTag;