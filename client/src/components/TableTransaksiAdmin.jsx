import React, { useEffect, useState } from 'react'
import { Button, Container, Modal, Table } from 'react-bootstrap'
import { Transaksi } from './datas/Transaksi'
import ModalBox from './modal/ModalBox';
import ModalEdit from './modal/ModalEdit';
import ModalInvoice from './modal/ModalInvoice';
import { useMutation, useQuery } from 'react-query';
import { Tickets } from './datas/Ticket';
import { API } from './config/api';

function TableTransaksiAdmin() {

    const [showApproval, setShowApproval] = useState(false);
    const [showInvoice, setShowInvoice] = useState(false);
    const [idTransaction, setIdTransaction] = useState();

    const [idDelete, setIdDelete] = useState(null);
    const [confirmDelete, setConfrimDelete] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setShowInvoice(false);
    };
    const handleShow = () => setShow(true);

    let { data: Transaction, refetch } = useQuery("transactionCache", async () => {
        const response = await API.get("/transactions");
        return response?.data?.data
    })

    const handleDelete = (id) => {
        setIdDelete(id);
        handleShow();
    };

    const deleteById = useMutation(async (id) => {
        try {
            await API.delete(`/transaction-delete/${id}`);
            refetch();
        } catch (error) {
            console.log(error);
        }
    });

    useEffect(() => {
        if (confirmDelete) {
            handleClose();
            deleteById.mutate(idDelete);
            setConfrimDelete(null);
        }
        // eslint-disable-next-line
    }, [confirmDelete]);

    return (
        <>
            <Container>
                <Table responsive="sm" striped>
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Users</th>
                            <th>Tiket</th>
                            <th>Bukti Transfer</th>
                            <th>Status Payment</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Transaction?.map((transaksi, index) => (
                            <tr>
                                <td>{index + 1}</td>
                                <td>{transaksi?.user.fullname}</td>
                                <td>{transaksi?.ticket.start_station.name} - {transaksi?.ticket.destination.name}</td>
                                <td>buktitf.jps</td>
                                <td>{transaksi?.status}</td>
                                <td>
                                    <div className='m-0'>
                                        <Button variant='transparent' onClick={() => { setShowInvoice(true); setIdTransaction(transaksi.id) }} size='sm'>
                                            <img src="../src/assets/img/search1.svg" alt="" />
                                        </Button>
                                        <Button variant='transparent' size='sm' onClick={() => setShowApproval(true)}>
                                            <img src="../src/assets/img/edit1.svg" alt="" />
                                        </Button>
                                        <Button variant="transparent" onClick={() => {
                                            handleDelete(transaksi.id);
                                        }}>
                                            <img src="../src/assets/img/trash1.svg" alt="" />
                                        </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <ModalInvoice show={showInvoice} id={idTransaction} onHide={handleClose} showInvoice={setShowInvoice} />
                    <ModalEdit id={idTransaction} show={showApproval} showApproval={setShowApproval} />
                    <ModalBox show={show} handleClose={handleClose} setDel={setConfrimDelete} />
                </Table>
            </Container>
        </ >
    )
}

export default TableTransaksiAdmin