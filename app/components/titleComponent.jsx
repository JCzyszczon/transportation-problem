"use client";
import React from 'react';
import { motion } from 'framer-motion';

function TitleComponent({titleType, titleSize, titleText}) {
  return (
    <section className='w-full h-auto flex flex-col justify-center items-center md:gap-3 gap-2'>
        <h1 className={`${titleSize == 1 ? 'responsive_text' : titleSize == 2 ? 'responsive_text2' : 'responsive_text3'} ${titleType == 1 ? 'font-extrabold' : titleType == 2 ? 'font-normal' : 'font-light'} tracking-tighter text-center`}>{titleText}</h1>
        <motion.span initial={{width: 0}} animate={{width: "20%"}} transition={{duration: 0.4, type: "tween"}} className={`w-[20%] h-[2px] rounded-full bg-[#9a6aff]`}></motion.span>
    </section>
  )
}

export default TitleComponent;