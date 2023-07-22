import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useMutation } from 'react-query'
import { API } from '../../config/API'

function ModalBox({ show, handleClose, setDel }) {

    const handleDelete = () => {
        setDel(true)
    }

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                    <div style={{ fontSize: '20px', fontWeight: '900' }}>
                        HAPUS TRANSAKSI
                    </div>
                    <div style={{ fontSize: '16px', fontWeight: '500' }} className="mt-2">
                        Apakah anda yakin untuk menghapus transaksi ini?
                    </div>
                    <div className="text-end mt-5">
                        <Button onClick={handleDelete} size="sm" className="btn-success me-2" style={{ width: '135px' }}>Ya</Button>
                        <Button onClick={handleClose} size="sm" className="btn-danger" style={{ width: '135px' }}>Tidak</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default ModalBox