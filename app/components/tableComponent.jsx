import React, { useState } from 'react';
import Button from './buttonStandard';
import { IoIosArrowRoundForward } from 'react-icons/io';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorComponent from './errorComponent';
import { motion, AnimatePresence } from 'framer-motion';

function TableComponent({supply, demand, closeModal, changeStage, actualState}) {

    const tableHeaders = Array.from({ length: demand }, (_, index) => index + 1);
    const tableRows = Array.from({ length: supply }, (_, index) => index + 1);

    const handleClose = () => {
        closeModal();
    }

    const schema = yup.object().shape({
        costs: yup.array()
          .of(yup.array()
            .of(
              yup.number()
                .min(0.01, "Cost unit must be a positive number.")
                .max(999, "Cost unit must be less than 1000.")
                .required("Cost unit is required.")
                .typeError("Cost unit must be a number.")
            )
          )
      });
    
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const submitUnitForm = (formData) => {
        changeStage(formData);
    }

    return (
        <motion.section initial={{x: 50, opacity: 0}} animate={actualState ? {x: '-100%', opacity: 0} : {x: 0, opacity: 1}} transition={{ duration: 0.5, type: 'tween'}} className='md:w-[80%] w-full flex flex-col justify-start items-center'>
            <form id='unitCosts' className='w-full overflow-x-auto h-full pb-10 mb-2' onSubmit={handleSubmit(submitUnitForm)}>
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
                                    <td key={'row' + rows + 'col' + header} className='relative'>
                                        <Controller
                                        name={`costs[${rows - 1}][${header - 1}]`}
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                type="number"
                                                {...field}
                                                className='w-full md:text-base text-sm min-w-[80px] md:p-2 p-1 outline-none border-2 border-secondColor rounded-md focus:border-primeColor duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
                                            />
                                        )}
                                        />
                                        <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
                                        {errors.costs && errors.costs[rows - 1] && errors.costs[rows - 1][header - 1] && (
                                            <ErrorComponent message={errors.costs[rows - 1][header - 1].message}/>
                                        )}
                                        </AnimatePresence>
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
                <Button type='submit' buttonType={1} form="unitCosts">Continue<IoIosArrowRoundForward className='text-2xl group-hover:translate-x-1 duration-300'/></Button>
            </section>
        </motion.section>
    )
}

export default TableComponent;