import { createContext } from "react"

const tickets = [
    {
        id: 1,
        nama: 'Argo wils',
        Berangkat: '05.00',
        TempatAwal: 'jakarta',
        TempatTujuan: 'Surabaya',
        Tiba: '10.05',
        Durasi: '5j 05m',
        Harga: 'Rp.250.000'
    },
    {
        id: 2,
        nama: 'Argo wils',
        Berangkat: '05.00',
        TempatAwal: 'jakarta',
        TempatTujuan: 'Surabaya',
        Tiba: '10.05',
        Durasi: '5j 05m',
        Harga: 'Rp.250.000'
    },
    {
        id: 3,
        nama: 'Argo wils',
        Berangkat: '05.00',
        TempatAwal: 'jakarta',
        TempatTujuan: 'Surabaya',
        Tiba: '10.05',
        Durasi: '5j 05m',
        Harga: 'Rp.250.000'
    },
    {
        id: 4,
        nama: 'Argo wils',
        Berangkat: '05.00',
        TempatAwal: 'jakarta',
        TempatTujuan: 'Surabaya',
        Tiba: '10.05',
        Durasi: '5j 05m',
        Harga: 'Rp.250.000'
    },
]

export const Tickets = createContext(tickets)