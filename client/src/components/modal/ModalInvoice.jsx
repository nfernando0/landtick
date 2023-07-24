import React from 'react'
import { Modal, Table } from 'react-bootstrap'
import { useQuery } from 'react-query';
import { FormatRupiah } from '@arismun/format-rupiah';
import { API } from '../../config/api';

function ModalInvoice(props) {

    // const [showInvoice, setShowInvoice] = useState(show)
    const handleClose = () => showInvoice(false)



    let { data: Transactions } = useQuery(["transactionsCache", props.id], async () => {
        const response = await API.get(`/transaction/${props.id}`);
        return response.data.data
        // console.log(response.data.data)
    })
    return (
        <div>
            <Modal show={props.show} handleClose={handleClose} onHide={props.onHide} size='lg'>

                <Modal.Body>
                    <h1>INVOICE</h1>
                    <p style={{ fontWeight: '400', fontSize: '20px', color: '#878787', marginTop: '-10px' }}>Kode Invoice: INV0101</p>

                    <div style={{ marginTop: '47px' }}>
                        <h4>Kereta Api</h4>
                        <h5 style={{ fontWeight: '400', fontSize: '20px', color: '#878787', marginTop: '-10px' }}>{Transactions?.ticket.start_date}</h5>
                    </div>
                    <div style={{ marginTop: '47px' }}>
                        <h2>{Transactions?.ticket.train_name}</h2>
                        <h4 style={{ fontWeight: '400', fontSize: '20px', color: '#878787', marginTop: '-10px' }}>{Transactions?.ticket.train_type}</h4>
                    </div>
                    <div style={{ width: '300px', marginTop: '30px' }}>
                        <div className='d-flex justify-content-between'>
                            <div className='d-block'>
                                <p>{Transactions?.ticket.start_time}</p>
                                <p style={{ marginTop: '-20px', color: '#878787' }}>{Transactions?.ticket.start_date}</p>
                            </div>
                            <div style={{ marginRight: '60px' }}>
                                <p style={{ margin: "0" }} className='fw-bold'>{Transactions?.ticket.start_station.kota}</p>
                                <p>Station {Transactions?.ticket.start_station.name}</p>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div className='d-block'>
                                <p >{Transactions?.ticket.arrival_time}</p>
                                <p style={{ marginTop: '-20px', color: '#878787' }}>{Transactions?.ticket.start_date}</p>
                            </div>
                            <div className='d-block' style={{ marginLeft: '20px' }}>
                                <p style={{ margin: "0" }} className='fw-bold'>{Transactions?.ticket.destination.kota}</p>
                                <p>Station {Transactions?.ticket.destination.name}</p>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div>
                        <Table size='sm'>
                            <thead>
                                <tr>
                                    <th style={{ fontWeight: '400' }}>
                                        No. Tanda Pengenal
                                    </th>
                                    <th style={{ fontWeight: '400' }}>
                                        Nama Pemesan
                                    </th>
                                    <th style={{ fontWeight: '400' }}>
                                        No. Handphone
                                    </th>
                                    <th style={{ fontWeight: '400' }}>
                                        Email
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>11175033003970001</td>
                                    <td>{Transactions?.user.fullname}</td>
                                    <td>{Transactions?.user.phone}</td>
                                    <td>{Transactions?.user.email}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                    <hr />
                    <div style={{ backgroundColor: '#d0d0d0d0' }}>
                        <div className='d-flex align-items-center justify-content-between m-auto p-1'>
                            <span>TOTAL</span>
                            <span className='harga'>
                                <FormatRupiah className='harga' value={Transactions?.ticket.price} />
                            </span>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalInvoice