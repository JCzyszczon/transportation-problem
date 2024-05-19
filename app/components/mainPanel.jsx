"use client";
import React, { useState, useEffect } from 'react';
import TitleComponent from './titleComponent';
import FormComponent from './formComponent';
import { AnimatePresence } from 'framer-motion';
import GenerateTableModal from './generateTableModal';

function MainPanel() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState();

    const handleOpenModal = (data) => {
        setIsModalOpen(true);
        setFormData(data);
    }

    useEffect(() => {
        if (isModalOpen) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "auto";
        }
        return () => {
          document.body.style.overflow = "auto";
        };
    }, [isModalOpen]);

    return (
        <>
        <section className='md:max-w-[800px] max-w-[90%] min-w-[30%] w-full panelGlass rounded-xl border border-thirdColor shadow-2xl flex flex-col justify-start items-center p-10 gap-10'>
            <TitleComponent titleText="Transportation settings" titleSize={2} titleType={1}/>
            <FormComponent generationComplete={handleOpenModal}/>
        </section>
        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {isModalOpen &&   
            <GenerateTableModal data={formData} closeModal={() => setIsModalOpen(false)}/>
        }
        </AnimatePresence>
        </>
    )
}

export default MainPanel