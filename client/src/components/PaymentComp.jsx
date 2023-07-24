import React, { useEffect } from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { API } from '../config/API';
import { useMutation, useQuery } from 'react-query';
import { FormatRupiah } from '@arismun/format-rupiah';


function PaymentComp(props) {
    const navigate = useNavigate()
    let { data: users } = useQuery("StationCaches", async () => {
        const response = await API.get("/user");
        return response.data.data
    })

    const handleBuy = useMutation(async () => {
        try {
            const response = await API.get(`/payment/${props.id}`)

            console.log("ini response token", response)
            const token = response.data.data.token
            console.log("test ", response.data.data.token)

            window.snap.pay(token, {
                onSuccess: function (result) {
                    console.log(result)
                    navigate('/tiket')
                },
                onPending: function (result) {
                    console.log(result)
                    navigate('/tiket')
                },
                onError: function (result) {
                    console.log(result)
                    navigate('/tiket')
                },
                onClose: function () {
                    alert("Tutup")
                }
            })
        } catch (error) {
            console.log(error)
        }
    })
    // console.log("test", window.snap.token)

    useEffect(() => {
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        const myMidtransClientKey = process.env.REACT_APP_MIDTRANS_CLIENT_KEY;  


        let scriptTag = document.createElement("script")
        scriptTag.src = midtransScriptUrl

        scriptTag.setAttribute("data-client-key", myMidtransClientKey)

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag)
        };
    }, []);

    return (
        <div>
            <Container>
                <Row>
                    <Col md={8}>

                        <Card className='card-payment'>
                            <img src="../src/assets/img/right.png" width='150' style={{ marginTop: '-5px' }} height='30' alt="" />
                            <Table striped>
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
                                        <td>9999999</td>
                                        <td>{users.username}</td>
                                        <td>{users.phone}</td>
                                        <td>{users.email}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card>
                        <h5 className='mx-5 my-3 fw-bolder'>Rincian Harga</h5>
                        <Col md={7}>
                            <Card className='p-0 mb-4'>
                                <div className='d-flex justify-content-between p-2'>
                                    <p>{props?.namaKereta} (Dewasa)x1</p>
                                    <p>
                                        <FormatRupiah value={props?.hargaTransaksi} />
                                    </p>
                                </div>
                                <div className='d-flex justify-content-between bg-gray p-2'>
                                    <p>Total</p>
                                    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
                                        <FormatRupiah className='harga' value={props?.hargaTransaksi} />
                                    </p>
                                </div>
                            </Card>
                            <Button variant='primary' onClick={() => { handleBuy.mutate(props.id) }} style={{ marginLeft: '45px', width: '82%' }}>Pesan Tiket</Button>
                        </Col>
                    </Col>
                    <Col md={4}>
                        <Card className='card-payment'>
                            <div className='d-flex p-3 bg-gray'>
                                <div>
                                    <h3>Kereta Api</h3>
                                    <p>Saturday, 21 Februari 2020</p>
                                </div>
                                <div>
                                </div>
                            </div>
                        </Card>
                        <Card className='card-payment p-3'>
                            <h3>{props?.namaKereta}</h3>
                            <p className='text-secondary'>{props?.tipeKereta} (H)</p>
                            <div className='d-flex justify-content-around mb-2 align-items-center'>
                                <div>
                                    <div className="circles mb-4"></div>
                                </div>
                                <div>
                                    <p className='m-0'>{props?.jam}</p>
                                    <p className='text-secondary small'>{props?.waktuMulai}</p>
                                </div>
                                <div>
                                    <p className='m-0'>{props?.kotaAwal}</p>
                                    <p className='text-secondary small'>Stasiun {props?.stasiunAwal}</p>
                                </div>
                            </div>
                            <div className='d-flex justify-content-around align-items-center'>
                                <div>
                                    <div className="circle mb-4"></div>
                                </div>
                                <div>
                                    <p className='m-0'>{props?.waktuSelesai}</p>
                                    <p className='text-secondary small'>{props?.waktuMulai}</p>
                                </div>
                                <div>
                                    <p className='m-0'>{props?.kotaAkhir}</p>
                                    <p className='text-secondary small'>Stasiun {props?.stasiunAkhir}</p>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default PaymentComp