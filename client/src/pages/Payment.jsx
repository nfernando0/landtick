import React from 'react'
import NavbarComp from '../components/NavbarComp'
import { Col, Container, Row } from 'react-bootstrap'
import PaymentComp from '../components/PaymentComp'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { API } from '../components/config/api'

function Payment() {

  let p = useParams()
  let i = parseInt(p.id)

  let { data: transactions } = useQuery("TicketsCachess", async () => {
    const response = await API.get(`/transaction/${i}`);
    return response.data.data
  })

  return (
    <div>
      <Container className='mt-5'>
        <Row>
          <Col>
            <h3 className='mx-5 my-3'>Invoice</h3>
            <PaymentComp key={transactions?.id} id={transactions?.id} namaKereta={transactions?.ticket?.train_name} tipeKereta={transactions?.ticket?.train_type} qty={transactions?.qty} hargaTiket={transactions?.ticket?.price} hargaTransaksi={transactions?.ticket?.price} waktuMulai={transactions?.ticket?.start_date} waktuSelesai={transactions?.ticket?.arrival_time} jam={transactions?.ticket?.start_time} stasiunAwal={transactions?.ticket?.start_station.name} stasiunAkhir={transactions?.ticket?.destination.name} kotaAwal={transactions?.ticket?.start_station.kota} kotaAkhir={transactions?.ticket?.destination.kota} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Payment