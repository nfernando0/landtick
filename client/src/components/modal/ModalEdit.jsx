import React from 'react'
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap'

function ModalEdit(props) {
    return (
        <div>
            <Modal show={props.show} onHide={props.onHide}>
                <Modal.Body>
                    <Container>
                        <Row className='justify-content-md-center'>
                            <Col md={8}>
                                <Form>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Enter email" disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Enter email" disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Enter email" disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Control type="email" placeholder="Enter email" disabled />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Select aria-label="Default select example">
                                            <option>Open this select menu</option>
                                            <option value="1">Approved</option>
                                            <option value="2">Pending</option>
                                            <option value="3">Cancel</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Button variant='success' type='submit'>Save</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalEdit