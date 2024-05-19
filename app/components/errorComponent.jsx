import React from 'react';
import { motion } from 'framer-motion';

function ErrorComponent({message}) {
  return (
    <motion.div 
        initial={{ height: 0 }}
        animate={{ height: "auto" }}
        exit={{ height: 0 }}
        transition={{ duration: 0.3 }}
        className={`absolute bottom-0 left-0 text-center md:text-sm text-xs w-[94%] z-[100] bg-primeColor rounded-b-md text-backgroundColor overflow-hidden`}
        style={{ originY: 0, translateY: "90%", translateX: "3%" }}
    >
        {message}
    </motion.div>
  )
}

export default ErrorComponent