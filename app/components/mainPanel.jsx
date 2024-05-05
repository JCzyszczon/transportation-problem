"use client";
import React, {useState} from 'react';
import { AnimatePresence, motion } from "framer-motion";
import SliderInput from './sliderInput';
import TitleComponent from './titleComponent';
import StarsIcon from '../img/stars-4.png';
import Image from 'next/image';
import { IoIosArrowRoundForward } from "react-icons/io";
import Button from './buttonStandard';

function MainPanel() {
    const [supplyRandValue, setSupplyRandValue] = useState();
    const [demandRandValue, setDemandRandValue] = useState();
    const [randLoading, setRandLoading] = useState(false);

    const handleRandomizeData = () => {
        setRandLoading(true);
        const randomSupply = Math.floor(Math.random() * 5) + 2;
        const randomDemand = Math.floor(Math.random() * 5) + 2;
        setSupplyRandValue(randomSupply);
        setDemandRandValue(randomDemand);
        setTimeout(() => {
            setRandLoading(false);
        }, 500);
    }

    return (
        <section className='md:max-w-[800px] max-w-[90%] min-w-[30%] w-full panelGlass rounded-xl border border-thirdColor shadow-2xl flex flex-col justify-start items-center p-10 gap-10'>
            <TitleComponent titleText="Transportation settings" titleSize={2} titleType={1}/>
            <section className='w-full flex flex-col justify-center items-center gap-10'>
                <section className='md:w-[70%] w-full flex flex-col justify-center items-start gap-4'>
                    <p className="uppercase font-extrabold sm:text-xs text-[10px] tracking-widest">Supply Constraints:</p>
                    <SliderInput startValue={2} endValue={6} stepValue={1} randValue={supplyRandValue}/>
                </section>
                <section className='md:w-[70%] w-full flex flex-col justify-center items-start gap-4'>
                    <p className="uppercase font-extrabold sm:text-xs text-[10px] tracking-widest">Demand Constraints:</p>
                    <SliderInput startValue={2} endValue={6} stepValue={1} randValue={demandRandValue}/>
                </section>
            </section>
            <section className='w-full flex md:flex-row flex-col justify-center items-center gap-4'>
                <Button onClick={handleRandomizeData} disabled={randLoading} title={randLoading ? "Randomizing..." : "Randomize data"}>Randomize <Image src={StarsIcon} className='w-[24px] group-hover:rotate-45 duration-300'></Image></Button>
                <Button title='Generate table' buttonType={1}>Generate <IoIosArrowRoundForward className='text-2xl group-hover:rotate-45 duration-300'/></Button>
            </section>
        </section>
    )
}

export default MainPanel