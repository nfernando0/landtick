import React, { useContext, useEffect, useState } from 'react'
import '../assets/css/Hero.css'
import { Container, Row, Col, Form, FormControl, Button, Modal } from 'react-bootstrap'
import { useQuery } from 'react-query';
import { UserContext } from '../Context/UserContext';
import Login from '../pages/Auth/Login';
import { Link } from 'react-router-dom';
import ModalComponent from './ModalComponent';
import ListTicket from './ListTicket';
import { API } from './config/api';


const TiketComp = (props) => {
    const [state] = useContext(UserContext);




    const [showSuccess, setShowSuccess] = useState(false);
    const handleCloseSuccess = () => { setShowSuccess(false) }
    const handleShowSuccess = () => { setShowSuccess(true) }
    const [filterStatus, setFilterStatus] = useState(false);

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
        // console.log("stasiun ", response.data.data)
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

    // const { startStation, DestinationStation, qty } = filter
    const OnChangeHandler = (e) => {
        setfilter({
            ...filter,
            [e.target.name]: e.target.value,
        });
    };


    let { data: rawTickets, refetch } = useQuery(["filteredCache", filterStatus], async () => {
        const response = filterStatus ? (
            await API.get(`/ticket/?start_station_id=${filter.startStation}&destination_id=${filter.DestinationStation}`)
        ) : (
            await API.get(`/tickets`));
        return response.data.data;
    });


    useEffect(() =>
        setTicket(rawTickets)
        , [rawTickets])

    return (
        <>

            <Row className="mx-auto shadow rounded" style={{ width: "80%", marginTop: "-1.8rem", backgroundColor: "white" }}>
                <Col sm="3" style={{ backgroundColor: "#F2F2F2", padding: "0", borderRadius: "10px 0 0 10px" }}>
                    <Container fluid className="my-3 d-flex align-items-center activeFormTicket bg-white">
                        <h4 className="mt-2 ms-2">Ticket Kereta Api</h4>
                    </Container>
                </Col>

                <Col className="p-3">
                    <h3>Tiket Kereta Api</h3>
                    <Form>
                        <Row>
                            <Col>
                                <h5>Asal</h5>
                                <Form.Select className="mb-3" value={filter.startStation} name="startStation" onChange={OnChangeHandler}>
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
                                        <div className='d-flex'>
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
                                <Form.Select className="mb-3" value={filter.DestinationStation} name="DestinationStation" onChange={OnChangeHandler}>
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
                                        <Form.Select className="mb-3" value={filter.qty} name="qty" onChange={OnChangeHandler}>
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
                                        {/* <Button className="mt-4 grad" onClick={handleReset}>Reset Filter</Button> */}
                                        <Button className="mt-4" onClick={() => { setFilterStatus(true); refetch() }}>Cari Ticket</Button>
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
                    <Col style={{ textAlign: "center" }}>Durasi</Col>
                    <Col style={{ textAlign: "center" }}>Harga Per Orang</Col>
                </Row>


                {filterStatus !== true ? (tickets?.map((ticket) =>
                    <div key={ticket.id} onClick={state.isLogin ? (() => { setPrice(ticket.price); setTiketSelected(ticket.id); handleShowSuccess() }) : (handleShowLogin)} style={{ cursor: "pointer" }}>
                        <ListTicket items={ticket} />
                    </div>
                )) : tickets?.length === 0 ? (
                    <h1 className="text-center my-5">Ticket tidak ada</h1>
                ) : (tickets?.map((ticket) =>
                    <div key={ticket.id} onClick={state.isLogin ? (() => { setPrice(ticket.price); setTiketSelected(ticket.id); handleShowSuccess() }) : (handleShowLogin)} style={{ cursor: "pointer" }}>
                        <ListTicket items={ticket} />
                    </div>
                ))}


                <ModalComponent onShow={showSuccess} qty={filter.qty} price={price} id={ticketSelected} onHide={handleCloseSuccess} />
                <Login show={showLogin} onHide={handleCloseLogin} onClick={handleShowRegister} />


            </Container >

        </>
    );
}

export default TiketComp