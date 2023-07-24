import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useMutation, useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom';
import { API } from './config/api';

function AddTicketComponent() {
    let { data: stations } = useQuery('StationsCache', async () => {
        const response = await API.get('/stations');
        return response.data.data
    });

    const [station, setStation] = useState([])
    const navigate = useNavigate();
    const [form, setForm] = useState({
        train_name: "",
        train_type: "",
        start_date: "",
        start_time: "",
        arrival_time: "",
        start_station_id: "",
        destination_id: "",
        price: "",
        qty: "",
    })


    const { train_name, train_type, start_date, start_time, arrival_time, start_station_id, destination_id, price, qty } = form;
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    // console.log(form);

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.set('train_name', form.train_name);
            formData.set('train_type', form.train_type);
            formData.set('start_date', form.start_date);
            formData.set('start_time', form.start_time);
            formData.set('arrival_time', form.arrival_time);
            formData.set('start_station_id', form.start_station_id);
            formData.set('destination_id', form.destination_id);
            formData.set('price', form.price);
            formData.set('qty', form.qty);

            const response = await API.post('/ticket', formData);
            alert('Berhasil');

            console.log(`Add Ticket Success ${response}`);
            setForm({
                train_name: "",
                train_type: "",
                start_date: "",
                start_time: "",
                arrival_time: "",
                start_station_id: "",
                destination_id: "",
                price: "",
                qty: "",
            })
            navigate("/")
        } catch (error) {
            console.log(`Add Ticket Failed ${error}`);
        }
    })


    return (
        <div>
            <div>
                <Container>
                    <Row>
                        <h1 className='my-5'>Add Ticket</h1>
                        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" name='train_name' onChange={handleChange} value={train_name} placeholder="Nama Kereta" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" name='train_type' onChange={handleChange} value={train_type} placeholder="Jenis Kereta" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="date" name='start_date' onChange={handleChange} value={start_date} placeholder="Tanggal Keberangkatan" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Select aria-label="Default select example" name='start_station_id' value={start_station_id} onChange={handleChange}>
                                    <option>Stasiun Keberangkatan</option>
                                    {stations?.map((station) => (
                                        <option key={station.id} value={station.id}>{station.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="time" onChange={handleChange} name='start_time' value={start_time} placeholder="Jam Keberangkatan" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Select aria-label="Default select example" name='destination_id' value={destination_id} onChange={handleChange}>
                                    <option>Stasiun Tujuan</option>
                                    {stations?.map((station) => (
                                        <option key={station.id} value={station?.id}>{station.name}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="time" onChange={handleChange} name='arrival_time' value={arrival_time} placeholder="Jam Tiba" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" onChange={handleChange} name='price' value={price} placeholder="Harga Tiket" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Control type="text" onChange={handleChange} name='qty' value={qty} placeholder="Qty" />
                            </Form.Group>
                            <Col md="4" className='align-items-center'>
                                <Button variant='success' type='submit'>Save</Button>
                            </Col>
                        </Form>
                    </Row>
                </Container>
            </div>
        </div >
    )
}

export default AddTicketComponent