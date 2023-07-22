import React, { useContext, useEffect, useState } from 'react'
import '../assets/css/Hero.css'
import { Container, Row, Col, Form, FormControl, Button, Modal } from 'react-bootstrap'
import { API, getApi, setAuthToken } from '../config/API';
import { useQuery } from 'react-query';
import { UserContext } from '../Context/UserContext';
import Login from '../pages/Auth/Login';
import { Link } from 'react-router-dom';
import ModalComponent from './ModalComponent';
import ListTicket from './ListTicket';


const TiketComp = (props) => {
    const [state] = useContext(UserContext);


    const [showSuccess, setShowSuccess] = useState(false);
    const handleCloseSuccess = () => { setShowSuccess(false) }
    const handleShowSuccess = () => { setShowSuccess(true) }

    const [showLogin, setShowLogin] = useState(false);
    const handleCloseLogin = () => setShowLogin(false);
    const handleShowLogin = () => {
        handleCloseRegister(false);
        setShowLogin(true);
    }
    const [showRegister, setShowRegister] = useState(false);
    const handleCloseRegister = () => setShowRegister(false);
    const handleShowRegister = () => {
        handleCloseLogin(false);
        setShowRegister(true);
    }
    let { data: stations } = useQuery("stationCache", async () => {
        const response = await API.get("/stations");
        return response.data.data;
    });

    const [ticketSelected, setTiketSelected] = useState()
    const [price, setPrice] = useState()

    const [tickets, setTicket] = useState([])

    const [filter, setfilter] = useState({
        startStation: "",
        DestinationStation: "",
        qty: "1",
    })

    const { startStation, DestinationStation, qty } = filter
    const OnChangeHandler = (e) => {
        setfilter({
            ...filter,
            [e.target.name]: e.target.value,
        });
    };

    let filtered = useQuery(["filteredCaches", filter], async () => {
        const response = await API.get(`/ticket`);
        return response.data.data;
    });

    const { data: filteredTicket } = filtered

    let { data: nonFiltered } = useQuery("tiketCache", async () => {
        const response = await API.get(`/tickets`);
        return response.data.data;
    })
    const handleFilter = () => {
        if (filteredTicket?.length > 0) {
            setTicket(filteredTicket)
        } else {
            setTicket(nonFiltered)
        }
    }
    const handleReset = () => {
        setfilter({
            startStation: "",
            DestinationStation: "",
        })
    }


    useEffect(() => {
        handleFilter()
    }, [filteredTicket, nonFiltered])

    return (
        <>

            <Row className="mx-auto shadow rounded" style={{ width: "80%", marginTop: "-1.8rem", backgroundColor: "white" }}>
                <Col sm="3" style={{ backgroundColor: "#F2F2F2", padding: "0", borderRadius: "10px 0 0 10px" }}>
                    <Container fluid className="my-3 d-flex align-items-center activeFormTicket bg-white">
                        {/* <img src={Icon} alt="icon" style={{ objectFit: "cover", fontSize: "1.125rem" }} /> */}
                        <h4 className="mt-2 ms-2">Ticket Kereta Api</h4>
                    </Container>
                </Col>

                <Col className="p-3">
                    <h3>Tiket Kereta Api</h3>
                    <Form>
                        <Row>
                            <Col>
                                <h5>Asal</h5>
                                <Form.Select className="mb-3" value={startStation} name="start_station" onChange={OnChangeHandler}>
                                    <option hidden>Pilih disini</option>
                                    {stations?.map((item) => (
                                        <option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3">
                                            <Form.Label className="h5">Tanggal Berangkat</Form.Label>
                                            <Form.Control type="date" />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <div>
                                            <input id="PP" type="checkbox" style={{ transform: "scale(1.5)", marginRight: "1rem" }} />
                                            <label for="PP" className="h5">Pulang Pergi?</label>
                                        </div>
                                    </Col>
                                </Row>
                            </Col>
                            <Col sm="1">
                                {/* <img src={IconForm} alt="icon"></img> */}
                            </Col>
                            <Col>
                                <h5>Tujuan</h5>
                                <Form.Select className="mb-3" value={DestinationStation} name="destination" onChange={OnChangeHandler}>
                                    <option hidden>pilih disini</option>
                                    {stations?.map((item) => (
                                        <option key={item?.id} value={item?.id}>
                                            {item?.name}
                                        </option>
                                    ))}
                                </Form.Select>
                                <Row>
                                    <Col>
                                        <h5>Dewasa</h5>
                                        <Form.Select className="mb-3" value={qty} name="qty" onChange={OnChangeHandler}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Form.Select>
                                    </Col>
                                    <Col>
                                        <h5>Bayi</h5>
                                        <Form.Select className="mb-3">
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                        </Form.Select>
                                    </Col>
                                    <Col >
                                        <Button className="mt-4 grad" onClick={handleReset}>Reset Filter</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>

            <Container>
                <Row className='mt-5 mb-3'>
                    <Col> Nama Kereta </Col>
                    <Col md="1">Berangkat</Col>
                    <Col md="1"></Col>
                    <Col>Tiba</Col>
                    <Col>Durasi</Col>
                    <Col>Harga Per Orang</Col>
                </Row>


                {tickets?.map((ticket) =>
                    <div key={ticket.id} onClick={state.isLogin ? (() => { setPrice(ticket.price); setTiketSelected(ticket.id); handleShowSuccess() }) : (handleShowLogin)} style={{ cursor: "pointer" ,boxShadow: "0px 0px 2px 2px rgba(0, 0, 0, 0.2)" }} className=''>
                <ListTicket items={ticket} />
            </div>
                )}


            <ModalComponent onShow={showSuccess} qty={filter.qty} price={price} id={ticketSelected} onHide={handleCloseSuccess} />
            <Login show={showLogin} onHide={handleCloseLogin} onClick={handleShowRegister} />


        </Container >
        {/* {tickets?.map((ticket) => (
                    
                ))} */}
        </>
    );
}

export default TiketComp