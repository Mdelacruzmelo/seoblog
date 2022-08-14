import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import nProgress from 'nprogress';
import {
    Navbar,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { APP_NAME } from '../config'
import { signout, isAuth } from '../actions/auth'

const Header = () => {

    const [authenticated, setAuthenticated] = useState()

    useEffect(() => {
        setAuthenticated(isAuth())
    }, [])

    const router = useRouter()

    useEffect(() => {
        router.events.on('routeChangeStart', nProgress.start)
        router.events.on('routeChangeComplete', nProgress.done)
    }, [])

    const styleHidden = {
        width: '0px',
        height: '0px',
        overflow: 'hidden',
        position: 'absolute',
        left: '0px',
        bottom: '0px'
    }

    return (
        <div>
            <Navbar>
                <Link href="/">
                    <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
                </Link>
                <Nav className="me-auto">

                    {!authenticated && (
                        <>
                            <NavItem style={{ cursor: 'pointer' }}>
                                <Link href="/signin"><NavLink>Signin</NavLink></Link>
                            </NavItem>
                            <NavItem style={{ cursor: 'pointer' }}>
                                <Link href="/signup"><NavLink>Signup</NavLink></Link>
                            </NavItem>
                        </>
                    )}

                    {authenticated && authenticated.role === 1 && (
                        <NavItem>
                            <Link href="/admin">
                                <NavLink>{`${authenticated?.name}'s Dashboard`}</NavLink>
                            </Link>
                        </NavItem>
                    )}

                    {authenticated && authenticated.role === 0 && (
                        <NavItem>
                            <Link href="/user">
                                <NavLink>{`${authenticated?.name}'s Dashboard`}</NavLink>
                            </Link>
                        </NavItem>
                    )}

                    {authenticated && (
                        <NavItem>
                            <NavLink
                                style={{ cursor: 'pointer' }}
                                onClick={() => { signout(() => router.replace(`/signin`)) }}>
                                Signout
                            </NavLink>
                        </NavItem>
                    )}

                </Nav>
            </Navbar>
        </div >
    );
}

export default Header;