import React from 'react'
import '../assets/css/Hero.css'
import { Container } from 'react-bootstrap'

function DetailComp() {
    return (
        <div>
            <Container>
                <div className='d-flex justify-content-between'>
                    <h1>E-Ticket</h1>
                    <div className=''>
                        <div className='d-flex align-items-center'>
                            <img src="../src/assets/img/kanan.png" alt="" />
                        </div>
                    </div>
                </div>
                <div>
                    <h1 className='mt-5'>Kereta Api</h1>
                </div>
            </Container>
        </div>
    )
}

export default DetailComp