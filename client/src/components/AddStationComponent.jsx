import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { API } from './config/api'

function AddStationComponent() {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        name: "",
        kota: "",
    })

    const { name, kota } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            formData.set('name', form.name);
            formData.set('kota', form.kota);

            const response = await API.post('/station', formData);
            alert('Berhasil');

            console.log(`Add Station Success ${response}`);
            setForm({
                name: "",
                kota: "",
            })
            navigate('/')
        } catch (err) {
            console.log(err)
        }
    })

    return (
        <div>
            <Container>
                <Row className="justify-content-md-center mt-5">
                    <Col lg={5}>
                        <h1 className='mt-4 mb-5'>Tambah Stasiun</h1>
                        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nama Stasiun</Form.Label>
                                <Form.Control onChange={handleChange} name='name' value={name} type="text" placeholder="Masukan Nama Stasiun" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Nama Kota</Form.Label>
                                <Form.Control onChange={handleChange} name='kota' value={kota} type="text" placeholder="Masukan Nama Kota" />
                            </Form.Group>
                            <Button variant="primary" type="submit">Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default AddStationComponent