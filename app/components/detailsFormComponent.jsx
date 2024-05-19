import React from 'react';
import { motion } from 'framer-motion';
import Button from './buttonStandard';
import { IoIosArrowRoundBack } from 'react-icons/io';

function DetailsFormComponent({ changeStage, goBack }) {

    const handleGoBack = () => {
        goBack();
    }

    return (
        <motion.section initial={{x: '100%', opacity: 0}} animate={changeStage ? {x: 0, opacity: 1} : {x: '100%', opacity: 0}} transition={{ duration: 0.5, type: 'tween'}} className='md:w-[80%] absolute w-full flex flex-col justify-start items-center'>
            <p>SIEMA</p>
            <section className='w-full flex md:flex-row flex-col justify-center items-center md:gap-4 gap-2'>
                <Button type='button' onClick={handleGoBack} buttonType={2}><IoIosArrowRoundBack className='text-2xl group-hover:-translate-x-1 duration-300'/> Back</Button>
                <Button type='submit' buttonType={1} form="unitCosts">Calculate</Button>
            </section>
        </motion.section>
    )
}

export default DetailsFormComponent;