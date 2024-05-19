import React from 'react'
import Button from './buttonStandard';
import { IoIosArrowRoundForward } from 'react-icons/io';

function TableComponent({supply, demand, closeModal}) {

    const tableHeaders = Array.from({ length: supply }, (_, index) => index + 1);
    const tableRows = Array.from({ length: demand }, (_, index) => index + 1);

    const handleClose = () => {
        closeModal();
    }

    return (
        <section className='md:w-[80%] w-full flex flex-col justify-start items-center gap-10'>
            <form className='w-full overflow-auto'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th></th>
                            {tableHeaders.map((header) => (
                                <th key={header} className='md:text-sm text-xs font-bold text-thirdColorHover p-2'>D<sub>{header}</sub></th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows.map((rows) => (
                            <tr key={rows}>
                                <th className='md:text-sm text-xs font-bold text-thirdColorHover p-2'>S<sub>{rows}</sub></th>
                                {tableHeaders.map((header) => (
                                    <td key={'row' + rows + 'col' + header}>
                                        <input type='number' className='w-full min-w-[80px] md:p-2 p-1 outline-none border-2 border-secondColor rounded-md focus:border-primeColor duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'></input>
                                    </td>
                                ))}
                                <th className='md:text-sm text-xs font-bold text-thirdColorHover p-2'></th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
            <section className='w-full flex md:flex-row flex-col justify-center items-center md:gap-4 gap-2'>
                <Button type='button' onClick={handleClose} buttonType={2}>Cancel</Button>
                <Button type='submit' buttonType={1}>Continue <IoIosArrowRoundForward className='text-2xl group-hover:translate-x-1 duration-300'/></Button>
            </section>
        </section>
    )
}

export default TableComponent