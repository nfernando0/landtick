import React from 'react'
import { Button, Table } from 'react-bootstrap';
import { useQuery } from 'react-query'
import { API } from '../config/API';
import { Link } from 'react-router-dom';

function TicketSayaComponent(props) {



    let { data: user } = useQuery("StationCaches", async () => {
        const response = await API.get("/user");
        return response.data.data
    })


    return (
        <div>
            <div className="card position-relative mb-4" style={{ position: "relative" }}>
                <div className='d-flex align-items-center img'>
                    {/* <img src="../src/assets/img/right.png" alt="" /> */}
                </div>
                <div className='kereta'>
                    <h1>Kereta Api</h1>
                    <p className='text-secondary'>Saturday, 21 Februari 20220</p>
                </div>
                <div className='mt-5 d-flex gap-5 top' >
                    <div>
                        <p style={{ margin: "0" }}>{props?.nama}</p>

                        <p className='text-secondary fs-6'>{props?.kelas}</p>
                    </div>
                    <div className='circles' style={{ marginLeft: "-22px" }}></div>
                    <div className=''>
                        <p style={{ margin: "0" }}>{props?.berangkat}</p>
                        <p className='text-secondary fs-6'>{props.awal}</p>
                    </div>
                    <div>
                        <p style={{ margin: "0" }} className='fs-5'>{props?.kota}</p>
                        <p className='text-secondary'>Station {props?.station}</p>
                    </div>
                </div>
                <div className='line'><img src="../src/assets/img/3.png" alt="" /></div>
                <div className='d-flex gap-5 px-4'>
                    {props.status !== "pending" ? (
                        <div className="text-center" style={{ textAlign: "center", background: "#95fc95", padding: "5px", height: "35px", borderRadius: "3px" }}>
                            <p style={{ color: "green", padding: "2px" }}>Approved</p>
                        </div>
                    ) : (
                        <div className="text-center" style={{ textAlign: "center", background: "#fce3ec", padding: "5px", height: "35px", borderRadius: "3px" }}>
                            <p style={{ color: "orange" }}>Pending</p>
                        </div>

                    )}
                    <div className='circle' style={{ marginLeft: "20px" }}></div>
                    <div>
                        <p className='fw-bold' style={{ margin: "0", marginLeft: "5px" }}>{props?.tiba}</p>
                        <p className='text-secondary'>{props?.awal}</p>
                    </div>
                    <div>
                        <p className='fw-bold fs-5' style={{ margin: "0" }}>{props?.kotaAkhir}</p>
                        <p className='text-secondary'>Station {props?.akhir}</p>
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
                                <td>{user?.fullname}</td>
                                <td>{user?.phone}</td>
                                <td>{user?.email}</td>
                            </tr>
                        </tbody>
                    </Table>
                    {props.status !== "pending" ? (
                        <span style={{ marginLeft: "860px", top: "100px", position: "absolute" }}>
                            <img src="../src/assets/img/barcode.png" alt="" />
                        </span>
                    ) : (
                        <Link to={`/payment/${props?.id}`} type='submit' className="btn float-end btn-bayar text-white">Bayar Sekarang</Link>
                    )}
                </div>
            </div>
        </div >
    )
}

export default TicketSayaComponent