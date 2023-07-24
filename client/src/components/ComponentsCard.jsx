import React, { useContext, useEffect, useState } from 'react'
import '../assets/css/Hero.css'
import { Form, Link, Navigate, useNavigate } from 'react-router-dom'

import TiketComp from './TiketComp'
// import { API, getApi, setAuthToken } from '../config/API'
import { API, getApi, setAuthToken } from '../config/API'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useQuery } from 'react-query'


function ComponentsCard() {

    let { data: stations } = useQuery('StationsCache', async () => {
        const response = await API.get('/stations');
        // console.log("Test  ", response.data.data)
        return response.data.data
    })


    const [form, setForm] = useState({
        start_station_id: '',
        destination_id: '',
    })

    const { start_station_id, destination_id } = form
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };


    return (
        <>
            <TiketComp startStation={start_station_id} DestinationStation={destination_id} />

        </>
    )
}

export default ComponentsCard