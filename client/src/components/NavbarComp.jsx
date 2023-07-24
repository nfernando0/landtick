import { Children, React, useContext, useEffect, useState } from 'react'
import '../assets/css/Navbar.css'
import { Navbar, Container, Nav, Modal, NavDropdown, Dropdown, Button } from 'react-bootstrap'
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import { UserContext } from '../Context/UserContext';
import { Link } from 'react-router-dom';
import Profile from '../assets/img/profile.png';

function NavbarComp() {

    // const { title } = props
    const [state, dispatch] = useContext(UserContext)
    const [showLogin, setShowLogin] = useState(false);
    const [showRegister, setShowRegister] = useState(false);

    const handleLoginModalClose = () => {
        setShowLogin(false);
    };
    const handleShowLogin = () => {
        setShowLogin(true);
        handleCloseShowRegister(false)
    }

    const handleShowregister = () => {
        setShowRegister(true);
        handleLoginModalClose(false)
    };
    const handleCloseShowRegister = () => {
        setShowRegister(false);
    }

    const username = localStorage.getItem('username');


    // useEffect(() => {
    //     if (username === true) {
    //         setShowLogin(false);
    //     }
    // }, [username])

    const handleLogout = () => {
        dispatch({
            type: "LOGOUT",
        });
    }

    return (
        <div className='navComp'>
            <Navbar bg="white" data-bs-theme="white" className='shadow-sm navbar'>
                <Container>
                    <Navbar.Brand href="/" >
                        <span>LandTick</span>
                        <img src="../src/assets/img/logo.png" width="45" height="45" alt="Logo" />
                    </Navbar.Brand>
                    {state.user.role === "admin" ? (
                        <Dropdown>
                            <Dropdown.Toggle variant='transparent' id='dropdown-split-basic' className='gap-2 d-flex align-items-center' style={{ border: "none" }}>
                                <h4 style={{ color: "#EC7AB7" }}>{state.user.username}</h4>
                                <img src={Profile} alt="" />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Link to="/dashboard" style={{ textDecoration: "none", marginLeft: "10px", display: "flex" }}>
                                    Dashboard
                                </Link>
                                <Link to="/addTicket" style={{ textDecoration: "none", marginLeft: "10px", display: "flex", marginTop: "10px" }}>
                                    Tambah Ticket
                                </Link>
                                <Link to="/station" style={{ textDecoration: "none", marginLeft: "10px", display: "flex", marginTop: "10px" }}>
                                    Tambah Stasiun
                                </Link>

                                <Dropdown.Divider />
                                <Dropdown.Item href="#" onClick={handleLogout}>
                                    <Link to={"/"} style={{ textDecoration: "none" }}>Logout</Link>
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : state.isLogin ? (
                        <>
                            <Dropdown>
                                <Dropdown.Toggle variant='transparent' className='gap-2 d-flex align-items-center' style={{ border: "none" }}>
                                    <h4 style={{ color: "#EC7AB7" }}>{state.user.username}</h4>
                                    <img src={Profile} alt="" />
                                </Dropdown.Toggle>

                                <Dropdown.Menu style={{ border: "1px solid #ec7ab7 !important" }}>
                                    <Link to={`/tiket/${state.user.id}`} style={{ border: "none", textDecoration: "none" }}>
                                        <Dropdown.Item href="#/action-1">
                                            Tiket Saya
                                        </Dropdown.Item>

                                    </Link>

                                    <Link to={`/payment`} style={{ textDecoration: "none" }}>
                                        <Dropdown.Item href="#/action-2">Payment</Dropdown.Item>
                                    </Link>
                                    <Dropdown.Divider />
                                    <Dropdown.Item href="#" onClick={handleLogout}>
                                        <Link to={"/"} style={{ textDecoration: "none" }}>Logout</Link>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ) : (
                        <Nav>
                            <Button onClick={handleShowregister} variant="transparent" style={{ color: "pink", borderColor: "pink", borderWidth: "3px", width: "6rem", marginRight: "1rem" }}>Daftar</Button>
                            <Button onClick={handleShowLogin} className="btn btn-pink rounded">Login</Button>
                        </Nav>
                    )}


                </Container>
            </Navbar>
            <Login show={showLogin} onHide={handleLoginModalClose} onClick={handleShowLogin} />
            <Register show={showRegister} onHide={handleCloseShowRegister} onClick={handleShowregister} />

        </div >
    )
}

export default NavbarComp