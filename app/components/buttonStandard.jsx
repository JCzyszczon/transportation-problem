import React from 'react';

function Button({buttonType, children, ...props}) {
  return (
    <button className={`${buttonType == 1 ? 'bg-primeColor hover:bg-primeColorHover disabled:bg-[#ab7bFF]' : 'bg-thirdColor hover:bg-thirdColorHover disabled:bg-[#d2d2d2]'} disabled:cursor-not-allowed duration-300 md:text-base text-sm rounded-full px-4 md:py-2 py-1 md:min-w-[245px] min-w-0 md:w-auto w-full text-backgroundColor flex justify-center items-center gap-1 group`} {...props}>{children}</button>
  )
}

export default Button;