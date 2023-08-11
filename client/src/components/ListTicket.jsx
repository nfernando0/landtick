import React from 'react'
import '../assets/css/Hero.css'
import { Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FormatRupiah } from '@arismun/format-rupiah';
import Arrow from '../assets/img/Arrow.svg'

const ListTicket = ({ items }) => {
    return (
        <div className='text-decoration-none text-black d-flex justify-content-between  p-2 border mb-4 align-items-center'>
            <div>
                <p className='m-0'>{items.train_name}</p>
                <p className='text-secondary text-small'>{items.train_type} (H)</p>
            </div>
            <div>
                <p style={{ margin: "0" }}>{items?.start_time}</p>
                <p style={{ color: "#d0d0d0" }}>{items?.start_station.name}</p>
            </div>
            <img src={Arrow} alt="" />
            <div>
                <p style={{ margin: "0" }}>{items?.arrival_time}</p>
                <p style={{ color: "#d0d0d0" }}>{items?.destination.name}</p>
            </div>
            <p>2 jam</p>
            <p className="harga">
                <FormatRupiah value={items.price} />
            </p>
        </div>
    )
}

export default ListTicket