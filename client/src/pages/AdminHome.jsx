import React from 'react'
import NavbarComp from '../components/NavbarComp'
import { Container, Table } from 'react-bootstrap'
import TableTransaksiAdmin from '../components/TableTransaksiAdmin'
import FooterComp from '../components/FooterComp'

const AdminHome = () => {
    return (
        <div>
            <Container className='mt-5'>
                <h2>List Transaksi</h2>
                <TableTransaksiAdmin />
            </Container>
        </div>
    )
}

export default AdminHome