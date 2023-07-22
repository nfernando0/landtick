import React from 'react'
import NavbarComp from '../components/NavbarComp'
import { Link } from 'react-router-dom'
import '/src/assets/css/Tiket.css'
import { Container, Table } from 'react-bootstrap'
// import CardTiketComp from '../components/CardTiketComp'
import FooterComp from '../components/FooterComp'
import ButtonComp from '../components/ButtonComp'



function TiketSuccess() {
    return (
        <div>

            {/* <Container>
                <h1 className='my-5'>Tiket Saya</h1>
                <div className="card position-relative mb-2">
                    <div className='d-flex align-items-center img'>
                        <img src="../src/assets/img/right.png" alt="" />
                    </div>
                    <div className='kereta'>
                        <h1>Kereta Api</h1>
                        <p className='text-secondary'>Saturday, 21 Februari 20220</p>
                    </div>
                    <div className='mt-5 d-flex gap-5 top' >
                        <div>
                            <p>Argo Wils</p>
                            <p className='text-secondary fs-6'>Eksekutif</p>
                        </div>
                        <div className='circles'></div>
                        <div className=''>
                            <p>05.00</p>
                            <p className='text-secondary fs-6'>21 Februari 2020</p>
                        </div>
                        <div>
                            <p>Jakarta</p>
                            <p className='text-secondary'>Stasiun Gambir</p>
                        </div>
                    </div>
                    <div className='line'><img src="../src/assets/img/3.png" alt="" /></div>
                    <div className='d-flex gap-5 px-4'>
                        <div className='approved'>Approved</div>
                        <div className='circle'></div>
                        <div>
                            <p className='fw-bold'>10.05</p>
                            <p className='text-secondary'>21 Februari 2022</p>
                        </div>
                        <div>
                            <p className='fw-bold'>Surabaya</p>
                            <p className='text-secondary'>Stasiun Surabaya</p>
                        </div>
                    </div>
                    <div>

                        <Table className='tables'>
                            <thead>
                                <tr>
                                    <th>No. Tanda Pengenal</th>
                                    <th>Nama Pemesan</th>
                                    <th>No Handphone</th>
                                    <th>Email</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>31175033003970001</td>
                                    <td>Anto</td>
                                    <td>083896833112</td>
                                    <td>Anto@gmail.com</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
            <FooterComp /> */}
        </div >
    )
}

export default TiketSuccess