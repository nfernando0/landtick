import React from 'react'
import { Modal } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { API } from '../config/API';

function ModalComponent(props) {
    const handleClose = () => showModal(false)
    const navigate = useNavigate()
    let price = props.price * props.qty


    const HandleBuy = useMutation(async () => {
        try {
            let qty = parseInt(props.qty)
            const transaction = new FormData()
            transaction.set("ticket_id", props.id)
            transaction.set("qty", qty)
            transaction.set("price", price)
            const response = await API.post("/transaction", transaction);
            navigate(`/tiket/${props.id}`)
            return response.data.data;
        } catch (error) {
            console.log(error);
        }
    });

    return (
        <div>
            <Modal show={props.onShow} onHide={props.onHide} className='mt-5'>
                <Modal.Body>
                    <p>Tiket anda berhasil ditambahkan silahkan segera melakukan pembayaran
                        <span onClick={() => HandleBuy.mutate()}> <b style={{ cursor: "pointer" }}>Klik disini</b></span>
                    </p>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalComponent