"use client";
import { motion } from 'framer-motion';
import React, { useState, useRef } from 'react';

function InfoModal({ closeModal }) {

    const modalRef = useRef(null);

    const handleOutsideClick = (event) => {
        if(modalRef.current && !modalRef.current.contains(event.target)) closeModal();
    }

    return (
        <motion.section animate={{translateY: ['100%', '0%'], clipPath: ['ellipse(50% 50% at 50% 50%)', 'ellipse(75% 50% at 50% 50%)', 'ellipse(100% 60% at 50% 50%)'], transition: {duration: 0.5, type: 'keyframes', times: [0, 0.5, 1]}}} exit={{translateY: ['0%', '-100%'], clipPath: ['ellipse(100% 60% at 50% 50%)', 'ellipse(75% 50% at 50% 50%)', 'ellipse(50% 50% at 50% 50%)'], transition: {duration: 0.5, type: 'keyframes', times: [0, 0.5, 1]}}} className='w-screen min-h-[100vh] z-[100] max-h-[100px] fixed left-0 top-0 right-0 overflow-x-hidden overflow-y-scroll bg-backgroundColor'>
            <section onClick={handleOutsideClick} className='w-screen min-h-[100vh] z-[998] flex flex-col justify-center items-center lg:p-14 md:p-8 p-2 pb-20'>
                <section ref={modalRef} className='w-[80%] mainBg2 panelGlass rounded-xl border border-thirdColor shadow-2xl'>
                    <p>SIEMA</p>
                </section>
            </section>
        </motion.section>
    )
}

export default InfoModal;