"use client";
import React, {useState, useEffect} from 'react';
import { AnimatePresence, motion } from "framer-motion";

function SliderInput({ startValue, endValue, stepValue, styleType, randValue, onValueChange }) {
    const [itemValue, setItemValue] = useState();
    const [isSliderChanged, setIsSliderChanged] = useState(false);

    useEffect(() => {
        if(randValue) {
            setItemValue(randValue);
            setIsSliderChanged(true);
            handleValue(randValue);
            setTimeout(() => {
                setIsSliderChanged(false);
            }, 300);
        } else if(startValue) {
            setItemValue(startValue);
            handleValue(startValue);
        } else {
            setItemValue(0)
        }
    }, [randValue]);

    const handleChange = (event) => {
        setItemValue(parseInt(event.target.value));
        setIsSliderChanged(true);
        handleValue(event.target.value);
    }

    const handleDisplayOn = () => {
        setIsSliderChanged(true);
    }

    const handleDisplayOff = () => {
        setIsSliderChanged(false);
    }

    const sliderPosition = {
        left: `${((itemValue - 1.96) / (6 - 1.85)) * 100}%`
    };

    const setMaxValue = () => {
        setItemValue(endValue);
        setIsSliderChanged(true);
        handleValue(endValue);
        setTimeout(() => {
            setIsSliderChanged(false);
        }, 300);
    }

    const setMinValue = () => {
        setItemValue(startValue);
        setIsSliderChanged(true);
        handleValue(startValue);
        setTimeout(() => {
            setIsSliderChanged(false);
        }, 300);
    }

    const handleValue = (value) => {
        onValueChange(value);
    }

    return (
        <div className='w-full flex justify-center items-center gap-2 range relative'>
            <button type="button" title={`Set value to ${startValue}`} onClick={setMinValue} className={`${styleType == 2 ? 'bg-primeColor hover:bg-primeColorHover' : 'bg-thirdColor hover:bg-thirdColorHover'} duration-300 px-1 rounded-md text-backgroundColor`}>{startValue ? startValue : 0}</button>
            <div className={`w-full flex justify-center items-center gap-2 ${styleType == 2 ? 'style2' : 'style1'} range relative`}>
                <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
                {isSliderChanged && (
                    <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.2, type: "tween"}} className='sliderValue' style={sliderPosition}>
                        <p>{itemValue}</p>
                    </motion.div>
                )}
                </AnimatePresence>
                <input type='range' min={startValue ? startValue : 0} max={endValue ? endValue : 10} step={stepValue ? stepValue : 1} value={itemValue} onChange={handleChange} onPointerDown={handleDisplayOn} onPointerUp={handleDisplayOff} onMouseDown={handleDisplayOn} onMouseUp={handleDisplayOff} onTouchStart={handleDisplayOn} onTouchEnd={handleDisplayOff} className='w-full'></input>
            </div>
            <button type="button" title={`Set value to ${endValue}`} onClick={setMaxValue} className={`${styleType == 2 ? 'bg-thirdColor hover:bg-thirdColorHover' : 'bg-primeColor hover:bg-primeColorHover'} duration-300 px-1 rounded-md text-backgroundColor`}>{endValue ? endValue : 10}</button>
        </div>
    )
}

export default SliderInput