import { useContext, useState } from 'react'
import { Modal, Button, Form, FormLabel, InputGroup, Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Register from './Register';
import { UserContext } from '../../Context/UserContext';
import { useMutation } from 'react-query';
import { API, setAuthToken } from '../../components/config/api';

function Login({ show, onHide }) {

    const [, dispatch] = useContext(UserContext)
    const [message, setMessage] = useState(null);
    const handleClose = () => showLogin(false);
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(true);
    const [form, setForm] = useState({
        username: '',
        password: '',
    })
    const handleRegisterModalClose = () => {
        setShowRegister(false);
        setShowLogin(true)
    };



    const navigate = useNavigate()


    const { username, password } = form

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            const response = await API.post("/login", form)
            console.log("Login success ", response)

            // console.log(response.data.data.role)
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: response.data.data,
            });

            console.log("local storge", localStorage.token);
            setAuthToken(localStorage.token);
            if (response.data.data.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/");
            }
            console.log(response.data.data);
            setForm({
                username: '',
                password: '',
            })

            const alert = (
                <Alert variant="success" dismissible>
                    Login Success
                </Alert>
            );

            setMessage(alert);



        } catch (error) {
            const alert = (
                <Alert variant="danger" dismissible>
                    Login Failed
                </Alert>
            );
            setMessage(alert);
            console.log("Login Failed", error);
        }
    })

    return (
        <div>
            <Modal show={show} onHide={onHide}>
                <Modal.Body>
                    {message && message}
                    <Container>
                        <Row className='justify-content-center'>
                            <Col md={10}>
                                <h1 className='text-center'>LOGIN</h1>
                                <form onSubmit={(e) => handleSubmit.mutate(e)}>
                                    <div className='mb-3'>
                                        <Form.Label htmlFor='username'>Username</Form.Label>
                                        <Form.Control type="text" onChange={handleChange} value={username} name="username" placeholder="Enter Username" />
                                    </div>
                                    <div className='mb-3'>
                                        <Form.Label htmlFor='password'>Password</Form.Label>
                                        <Form.Control type="password" onChange={handleChange} value={password} name='password' placeholder="Password" />
                                    </div>

                                    <Button type='submit' onClick={onHide}>Login</Button>
                                </form>
                                <p className='text-center mt-3' >Belum punya akun? Klik <Link onClick={() => setShowRegister(true)}>Disini</Link></p>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
            <Register show={showRegister} onHide={handleRegisterModalClose} />
        </div>
    )
}

export default Login