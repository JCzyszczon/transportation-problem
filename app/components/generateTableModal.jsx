"use client";
import React, { useEffect, useRef } from 'react';
import { motion, useAnimate, usePresence } from "framer-motion";
import TitleComponent from './titleComponent';
import TableComponent from './tableComponent';

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
        <motion.section id='menu-background-pattern' animate={{translateY: ['-100%', '0%'], clipPath: ['ellipse(90% 50% at 50% 50%)', 'ellipse(65% 50% at 50% 50%)', 'ellipse(100% 60% at 50% 50%)'], transition: {duration: 0.5, type: 'easeOut', times: [0, 0.5, 1]}}} exit={{translateY: ['0%', '100%'], clipPath: ['ellipse(100% 60% at 50% 50%)', 'ellipse(65% 50% at 50% 50%)', 'ellipse(100% 50% at 50% 50%)'], transition: {duration: 0.5, type: 'easeOut', times: [0, 0.35, 0.7]}}} className='w-screen min-h-[100vh] z-[100] max-h-[100px] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-backgroundColor'>
            <section onClick={handleOutsideClick} className='w-screen min-h-[100vh] z-[998] flex flex-col justify-center items-center lg:p-14 md:p-8 p-2 pb-20'>
                <section ref={modalRef} className='md:max-w-[1200px] max-w-[90%] min-w-[30%] w-full panelGlass rounded-xl border border-thirdColor shadow-2xl flex flex-col justify-start items-center md:p-10 py-6 px-4 gap-10'>
                    <TitleComponent titleText="Unit transport costs" titleSize={2} titleType={1}/>
                    <TableComponent supply={data.supplyValue} demand={data.demandValue} closeModal={handleClose}/>
                    <p className='text-thirdColorHover text-sm font-light'>Stage 1/2</p>
                </section>
            </section>
        </motion.section>
    )
}