import React from 'react'
import Link from 'next/link'
import Layout from '../../components/Layout'
import Admin from '../../components/auth/Admin'

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <div className="row">
                    <div className="col-md-12 pt-5 pb-5">
                        <h3>Admin Dashboard</h3>
                    </div>
                    <div className="col-md-4">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <Link href="/admin/crud/category-tag">
                                    <a>Create category</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-8">Right</div>
                </div>
            </Admin>
        </Layout >
    );
}

export default AdminIndex;