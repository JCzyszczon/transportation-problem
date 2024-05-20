import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './buttonStandard';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ErrorComponent from './errorComponent';

function DetailsFormComponent({ changeStage, goBack, data }) {

    const demandHeaders = data ? Array.from({ length: data.costs[0].length }, (_, index) => index + 1) : null;

    const handleGoBack = () => {
        goBack();
    }

    const schema = yup.object().shape({
        supply: yup.array()
        .of(
            yup.number()
            .min(0.01, "Supply must be a positive number.")
            .max(999, "Supply must be less than 1000.")
            .required("Supply unit is required.")
            .typeError("Supply unit must be a number.")
        ),
        
        demand: yup.array()
        .of(
            yup.number()
            .min(0.01, "Demand must be a positive number.")
            .max(999, "Demand must be less than 1000.")
            .required("Demand is required.")
            .typeError("Demand must be a number.")
        ),
        buyingPrice: yup.array()
        .of(
            yup.number()
            .min(0.01, "Price must be a positive number.")
            .max(999, "Price must be less than 1000.")
            .required("Price is required.")
            .typeError("Price must be a number.")
        ),
        sellingPrice: yup.array()
        .of(
            yup.number()
            .min(0.01, "Price must be a positive number.")
            .max(999, "Price must be less than 1000.")
            .required("Price is required.")
            .typeError("Price must be a number.")
        ),
    });
    
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const submitDetailsForm = (formData) => {
        console.log(formData);
    }

    return (
        <motion.section initial={{x: '100%', opacity: 0}} animate={changeStage ? {x: 0, opacity: 1} : {x: '100%', opacity: 0}} transition={{ duration: 0.5, type: 'tween'}} className='md:w-[80%] absolute w-full flex flex-col justify-center items-center'>
            {data &&
            <form id='detailsForm' className='w-full overflow-x-auto h-full pb-10 mb-2' onSubmit={handleSubmit(submitDetailsForm)}>
                <table className='w-full'>
                    <thead>
                        <tr className='md:text-sm text-xs font-bold text-thirdColorHover p-2'>
                            <th></th>
                            {demandHeaders.map((demand) => (
                                <th key={demand + 'header'}>D<sub>{demand}</sub></th>
                            ))}
                            <th>Supply</th>
                            <th>Buying</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.costs.map((item, index) => (
                            <tr key={index + 'tr'}>
                                <th className='md:text-sm text-xs font-bold text-thirdColorHover p-2'>S<sub>{index + 1}</sub></th>
                                {item.map((element, elIndex) => (
                                    <td key={elIndex}>
                                        <input disabled value={element} className='w-full cursor-not-allowed md:text-base text-sm min-w-[80px] md:p-2 p-1 outline-none border-2 border-secondColor bg-secondColor rounded-md'/>
                                    </td>
                                ))}
                                <td className='relative'>
                                    <Controller
                                        name={`supply[${index}]`}
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
                                        {errors.supply && errors.supply[index] && (
                                            <ErrorComponent message={errors.supply[index].message}/>
                                        )}
                                    </AnimatePresence>
                                </td>
                                <td className='relative'>
                                    <Controller
                                        name={`buyingPrice[${index}]`}
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
                                        {errors.buyingPrice && errors.buyingPrice[index] && (
                                            <ErrorComponent message={errors.buyingPrice[index].message}/>
                                        )}
                                    </AnimatePresence>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <th className='md:text-sm text-xs font-bold text-thirdColorHover p-2'>Demand</th>
                            {demandHeaders.map((demand) => (
                                <td key={demand+'demand'} className='relative'>
                                    <Controller
                                        name={`demand[${demand - 1}]`}
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
                                        {errors.demand && errors.demand[demand - 1] && (
                                            <ErrorComponent message={errors.demand[demand - 1].message}/>
                                        )}
                                    </AnimatePresence>
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <th className='md:text-sm text-xs font-bold text-thirdColorHover p-2'>Selling</th>
                            {demandHeaders.map((demand) => (
                                <td key={demand+'selling'} className='relative'>
                                    <Controller
                                        name={`sellingPrice[${demand - 1}]`}
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
                                        {errors.sellingPrice && errors.sellingPrice[demand - 1] && (
                                            <ErrorComponent message={errors.sellingPrice[demand - 1].message}/>
                                        )}
                                    </AnimatePresence>
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </form>
            }
            <section className='w-full flex md:flex-row flex-col justify-center items-center md:gap-4 gap-2'>
                <Button type='button' onClick={handleGoBack} buttonType={2}><IoIosArrowRoundBack className='text-2xl group-hover:-translate-x-1 duration-300'/>Back</Button>
                <Button type='submit' buttonType={1} form="detailsForm">Calculate</Button>
            </section>
        </motion.section>
    )
}

export default DetailsFormComponent;