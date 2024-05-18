"use client";
import React, { useState } from 'react';
import { MdOutlineQuestionMark } from 'react-icons/md'
import InfoModal from './infoModal';
import { AnimatePresence } from 'framer-motion';

function HelpModalButton() {
    const [isModalOpen, setIsModalOpen] = useState(false);



    return (
        <>
        <button onClick={() => setIsModalOpen(true)} className='fixed md:right-8 right-4 md:bottom-8 md:top-auto bottom-auto top-4 bg-primeColor hover:bg-primeColorHover duration-300 rounded-full md:p-3 p-2'>
            <MdOutlineQuestionMark className='md:text-xl text-base text-backgroundColor'/>
        </button>
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModalOpen &&  
            <InfoModal closeModal={() => setIsModalOpen(false)}/>  
        }
        </AnimatePresence>
        </>
    )
}

export default HelpModalButton;