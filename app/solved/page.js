'use client';
import { useSearchParams } from 'next/navigation';
import LoadingElement from '../components/loadingElement';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ResultsPanel from '../components/resultsPanel';
import { FaA, FaArrowLeft } from 'react-icons/fa6';
import Link from 'next/link';

export default function Home() {

  const router = useRouter();

  const searchParams = useSearchParams()
  const data = searchParams.get('data');
  const finalData = JSON.parse(data);

  useEffect(() => {
    const delay = setTimeout(() => {
      if(!data) {
        router.push('/page-not-found');
      }
    }, 2000);

    return () => clearTimeout(delay);
  }, [data]);

  return (
    <section className='mainBg w-full min-h-screen flex justify-center items-center py-12 relative'>
      <section className='md:max-w-[800px] max-w-[90%] min-w-[30%] w-full panelGlass rounded-xl border border-thirdColor shadow-2xl flex flex-col justify-start items-center p-10 gap-10'>
      {finalData ? (
        <ResultsPanel resultsData={finalData}/>
      ) : (
        <LoadingElement/>
      )}
      </section>
      <Link href={"/"} title='Go Home' className='fixed md:left-8 left-4 md:top-8 top-4 bg-primeColor hover:bg-primeColorHover duration-300 rounded-full md:p-3 p-2'>
        <FaArrowLeft className='text-base text-backgroundColor'/>
      </Link>
    </section>
  );
}