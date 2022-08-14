import React from 'react'
import Link from 'next/link'
import Layout from '../../../components/Layout'
import Admin from '../../../components/auth/Admin'

const CategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <div className="row">
                    <div className="col-md-12 pt-5 pb-5">
                        <h3>Manage Categories and Tags</h3>
                    </div>
                    <div className="col-md-6">
                        Categories
                    </div>
                    <div className="col-md-6">
                        Tags
                    </div>
                </div>
            </Admin>
        </Layout >
    );
}

export default CategoryTag;