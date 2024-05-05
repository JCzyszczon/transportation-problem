"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useAnimate, usePresence } from "framer-motion";

export default function GenerateTableModal({ closeModal, data }) {

    const modalRef = useRef(null);
    
    console.log(data);


    const handleOutsideClick = (event) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            closeModal();
        }
    };

    const handleClose = () => {
        closeModal();
    }

    return (
        <section className='w-screen min-h-[100vh] z-[100] max-h-[100px] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-backgroundColor'>
            <section onClick={handleOutsideClick} className='w-screen min-h-[100vh] z-[998] flex flex-col justify-center items-center lg:p-14 md:p-8 p-2 pb-20'>
                <p ref={modalRef}>tutaj będzie generowana tabela na podstawie przeslanych danych</p>
            </section>
        </section>
    )
}