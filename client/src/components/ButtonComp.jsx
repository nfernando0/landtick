import React from 'react'
import { Button } from 'react-bootstrap'
import '../assets/css/Navbar.css'

const ButtonComp = (props) => {
    const { children, onClick = () => { }, type = "button", className = 'btn-pink w-100' } = props
    return (
        <div className='d-block'>
            <Button className={className} onClick={() => onClick()} type={type}>{children}</Button>
        </div>
    )
}

export default ButtonComp