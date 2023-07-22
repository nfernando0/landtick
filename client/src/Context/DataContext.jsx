import { createContext } from "react";

const data = [
    {
        id: 1,
        namaKereta: "Argo WIlis",
        berangkat: "05.00",
        tiba: "10.05",
        durasi: "5j 05m",
        class: "eksekutif (H)",
        stasiunAwal: "Gambir",
        stasiunAkhir: "Surabaya",
    },
    {
        id: 2,
        namaKereta: "Wilis Argo",
        berangkat: "05.00",
        tiba: "10.05",
        durasi: "5j 05m",
        class: "ekonomi",
        stasiunAwal: "Gambir",
        stasiunAkhir: "Surabaya",
    },
    {
        id: 3,
        namaKereta: "Anjasmara",
        berangkat: "05.00",
        tiba: "10.05",
        durasi: "5j 05m",
        class: "ekonomi",
        stasiunAwal: "Gambir",
        stasiunAkhir: "Surabaya",
    }
]

export const DataKereta = createContext(data)