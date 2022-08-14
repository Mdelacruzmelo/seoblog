import React, { useEffect } from 'react';
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

                    <NavItem style={isAuth() ? styleHidden : { cursor: 'pointer' }}>
                        <Link href="/signin"><NavLink>Signin</NavLink></Link>
                    </NavItem>

                    <NavItem style={isAuth() ? styleHidden : { cursor: 'pointer' }}>
                        <Link href="/signup"><NavLink>Signup</NavLink></Link>
                    </NavItem>

                    <NavItem style={
                        !isAuth()
                            ? styleHidden
                            : isAuth() && isAuth().role === 1
                                ? styleHidden
                                : { cursor: 'pointer' }}>
                        <Link href="/user">
                            <NavLink>{`${isAuth()?.name}'s Dashboard`}</NavLink>
                        </Link>
                    </NavItem>

                    <NavItem style={
                        !isAuth()
                            ? styleHidden
                            : isAuth() && isAuth().role === 0
                                ? styleHidden
                                : { cursor: 'pointer' }}>
                        <Link href="/admin">
                            <NavLink>{`${isAuth()?.name}'s Dashboard`}</NavLink>
                        </Link>
                    </NavItem>

                    <NavItem style={!isAuth() ? styleHidden : {}}>
                        <NavLink
                            style={{ cursor: 'pointer' }}
                            onClick={() => { signout(() => router.replace(`/signin`)) }}>
                            Signout
                        </NavLink>
                    </NavItem>

                </Nav>
            </Navbar>
        </div>
    );
}

export default Header;