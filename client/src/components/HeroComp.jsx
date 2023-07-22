import React, { useContext } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import '../assets/css/Hero.css'
import image1 from '/src/assets/img/1.png'
import image2 from '/src/assets/img/2.png'
import { Form, Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../Context/UserContext'
import ComponentsCard from './ComponentsCard'
import TiketComp from './TiketComp'

function HeroComp() {
    // const [state] = useContext(UserContext)
    // console.log(state)

    const handleNavigateToTiket = () => {
        navigate('/tiket')
    }

    return (
        <>
            <div className='hero'>
                <Container>
                    <Row>
                        <Col>
                            <h1 className='text-white'>Selamat Pagi, Ticket Seekers!</h1>
                            <p className='text-white'>Ingin Pulkam dengan Good Ideal? <span className='d-block'>Masuk atau Daftar Sekarang</span></p>

                        </Col>
                        <Col>
                            <div className='position-relative img'>
                                <img src={image1} className='position-absolute img-1' alt="image-1" />
                                <img src={image2} className='position-absolute img-2' alt="image-2" />
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Container>
                <div className='card-tiket'>
                    
                    {/* <TiketComp /> */}
                    <ComponentsCard />
                </div>
            </Container>

        </>
    )
}

export default HeroComp