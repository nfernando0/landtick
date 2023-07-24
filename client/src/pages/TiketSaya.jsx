import React from 'react'
import NavbarComp from '../components/NavbarComp'
import { Link, useNavigate, useParams } from 'react-router-dom'
import '/src/assets/css/Tiket.css'
import { Button, Container, Table } from 'react-bootstrap'
// import CardTiketComp from '../components/CardTiketComp'
import FooterComp from '../components/FooterComp'
import ButtonComp from '../components/ButtonComp'
import { useQuery } from 'react-query'
import { API } from '../config/API'
import { FormatRupiah } from '@arismun/format-rupiah'
import TicketSayaComponent from '../components/TicketSayaComponent'



function TiketSaya() {

    let { data: myTransactions } = useQuery("myTransactionsCaches", async () => {
        const response = await API.get("/transactionUser");
        console.log("data", response.data.data)
        return response.data.data
    })


    return (
        <div>

            <Container>
                <h1 className='my-5'>Tiket Saya</h1>
                {myTransactions?.map((transaction, index) => (
                    <TicketSayaComponent key={index} id={transaction?.id} kota={transaction?.ticket?.start_station?.kota} status={transaction?.status} nama={transaction?.ticket?.train_name} berangkat={transaction?.ticket?.start_time} awal={transaction?.ticket?.start_date} station={transaction?.ticket?.start_station?.name} akhir={transaction?.ticket?.destination?.name} kelas={transaction?.ticket?.train_type} kotaAkhir={transaction?.ticket?.destination?.kota} tiba={transaction?.ticket?.arrival_time} harga={FormatRupiah(transaction?.ticket?.price)} />
                ))}
            </Container>
            <FooterComp />
        </div >
    )
}

export default TiketSaya