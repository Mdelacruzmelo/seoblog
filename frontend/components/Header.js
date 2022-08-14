import React, { useState } from 'react';
import Link from 'next/link'
import Router from 'next/router'
import {
    setCookie,
    // getCookie, 
    deleteCookie,
    hasCookie
} from 'cookies-next';
import { APP_NAME } from '../config'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';
import { signout, isAuth } from '../actions/auth'

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Navbar >
                <Link href="/">
                    <NavLink className="font-weight-bold">{APP_NAME}</NavLink>
                </Link>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="me-auto" navbar>
                        {isAuth() && (
                            <NavItem>
                                <NavLink
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => { signout(() => Router.replace(`/signin`)) }}>
                                    Signout
                                </NavLink>
                            </NavItem>
                        )}
                        {!isAuth() && (
                            <>
                                <NavItem>
                                    <Link href="/signin"><NavLink>Signin</NavLink></Link>
                                </NavItem>
                                <NavItem>
                                    <Link href="/signup"><NavLink>Signup</NavLink></Link>
                                </NavItem>
                            </>
                        )}
                        <NavItem>
                            <NavLink href="https://github.com/reactstrap/reactstrap">
                                GitHub
                            </NavLink>
                        </NavItem>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                Options
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem>Option 1</DropdownItem>
                                <DropdownItem>Option 2</DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>Reset</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav >
                    <NavbarText>Simple Text</NavbarText>
                </Collapse >
            </Navbar >
        </div >
    );
}

export default Header;