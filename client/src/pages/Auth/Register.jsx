import { React, useState } from 'react'
import { Modal, Button, Form, Alert, Container, Row, Col } from 'react-bootstrap'
import { useMutation } from 'react-query';
import { API } from '../../components/config/api';

const Register = ({ show, onHide }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    fullname: "",
    gender: "",
    phone: "",
    address: "",
  })

  const { username, email, password, fullname, gender, phone, address } = form;


  const [message, setMessage] = useState(null);

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post('/register', form);
      console.log("Register Success", response);


      const alert = (
        <Alert variant="success" dismissible>
          Register Success
        </Alert>
      );
      setMessage(alert);

      setForm({
        username: "",
        email: "",
        password: "",
        fullname: "",
        gender: "",
        phone: "",
        address: "",
      })
    } catch (error) {
      const alert = (
        <Alert variant="danger" dismissible>
          Register Failed
        </Alert>
      );
      setMessage(alert);
      console.log("Register Failed", error);
    }
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <div>

      <Modal show={show} onHide={onHide}>
        <Modal.Body>
          {message && message}
          <Container>
            <Row className='justify-content-center'>
              <Col lg="11">
                <h1 className='text-center'>REGISTER</h1>
                <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                  <div className='mb-3'>
                    <Form.Label htmlFor='username'>Fullname</Form.Label>
                    <Form.Control type="text" name="fullname" onChange={handleChange} value={fullname} placeholder="Enter Fullname" />
                  </div>
                  <div className='mb-3'>
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Form.Control type="text" name="username" onChange={handleChange} value={username} placeholder="Enter Username" />
                  </div>
                  <div className="mb-3">
                    <Form.Label htmlFor='gender'>Gender</Form.Label>
                    <Form.Select aria-label="Default select example" className='mb-3' name='gender' value={gender} onChange={handleChange}>
                      <option hidden>Jenis Kelamin</option>
                      <option value="Laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </Form.Select>
                  </div>
                  <div className='mb-3'>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={handleChange} value={email} placeholder="Enter Email" />
                  </div>
                  <div className='mb-3'>
                    <Form.Label htmlFor='password'>Password</Form.Label>
                    <Form.Control type="password" name='password' onChange={handleChange} value={password} placeholder="Password" />
                  </div>
                  <div className='mb-3'>
                    <Form.Label htmlFor='phone'>Phone Number</Form.Label>
                    <Form.Control type="number" name="phone" onChange={handleChange} value={phone} placeholder="Enter Phone number" />
                  </div>
                  <div className='mb-3'>
                    <Form.Label htmlFor='address'>Alamat</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Leave a address here"
                      style={{ height: '100px' }}
                      className="mb-3 textArea"
                      name='address'
                      value={address}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type='submit'>Register</Button>
                </Form>
              </Col>
            </Row>
          </Container>

        </Modal.Body>
      </Modal>
    </div>
  )
}

export default Register