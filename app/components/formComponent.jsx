"use client";
import React, {useState} from 'react';
import SliderInput from './sliderInput';
import StarsIcon from '../img/stars-4.png';
import Image from 'next/image';
import { IoIosArrowRoundForward } from "react-icons/io";
import Button from './buttonStandard';
import LoadingElement from './loadingElement';

function FormComponent({ generationComplete }) {
    const [supplyRandValue, setSupplyRandValue] = useState();
    const [demandRandValue, setDemandRandValue] = useState();
    const [randLoading, setRandLoading] = useState(false);
    const [generateLoading, setGenerateLoading] = useState(false);

    const [supplyValue, setSupplyValue] = useState(2); 
    const [demandValue, setDemandValue] = useState(2);

    const handleSupplyChange = (value) => {
        setSupplyValue(value);
    }
    
    const handleDemandChange = (value) => {
        setDemandValue(value);
    }

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

    const handleSubmit = (event) => {
        setGenerateLoading(true);
        
        event.preventDefault();
        
        const data = {
            supplyValue: supplyValue,
            demandValue: demandValue
        };
    
        generationComplete(data);

        setTimeout(() => {
            setGenerateLoading(false);
        }, 2000);
    }

    return (
        <form className='w-full flex flex-col justify-start items-center gap-10' onSubmit={handleSubmit}>
            <section className='w-full flex flex-col justify-center items-center gap-10'>
                <section className='md:w-[70%] w-full flex flex-col justify-center items-start gap-4'>
                    <p className="uppercase font-extrabold sm:text-xs text-[10px] tracking-widest">Supply Constraints:</p>
                    <SliderInput startValue={2} endValue={6} stepValue={1} randValue={supplyRandValue} onValueChange={handleSupplyChange}/>
                </section>
                <section className='md:w-[70%] w-full flex flex-col justify-center items-start gap-4'>
                    <p className="uppercase font-extrabold sm:text-xs text-[10px] tracking-widest">Demand Constraints:</p>
                    <SliderInput startValue={2} endValue={6} stepValue={1} randValue={demandRandValue} onValueChange={handleDemandChange}/>
                </section>
            </section>
            <section className='w-full flex md:flex-row flex-col justify-center items-center md:gap-4 gap-2'>
                <Button onClick={handleRandomizeData} disabled={randLoading || generateLoading} title={randLoading ? "Randomizing..." : "Randomize data"}>Randomize <Image src={StarsIcon} alt='Stars Icon' title='Stars icon' className='w-[24px] group-hover:rotate-45 duration-300'></Image></Button>
                <Button disabled={generateLoading || randLoading} title={generateLoading ? "Generating..." : "Generate table"} type="submit" buttonType={1}>{generateLoading ? <LoadingElement/> : <>Generate <IoIosArrowRoundForward className='text-2xl group-hover:rotate-45 duration-300'/></>}</Button>
            </section>
        </form>
    )
}

export default FormComponent