'use client';
import { useSearchParams } from 'next/navigation';
import LoadingElement from '../components/loadingElement';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();

  const searchParams = useSearchParams()
  const data = searchParams.get('data');
  const finalData = JSON.parse(data);
  console.log(finalData);

  useEffect(() => {
    const delay = setTimeout(() => {
      if(!data) {
        router.push('/page-not-found');
      }
    }, 2000);

    return () => clearTimeout(delay);
  }, [data]);

  function createMatrix(data) {
    const { costs, sellingPrice, buyingPrice, demand, supply } = data;

    const matrix = [];

    // obliczenie maksymalnego zysku i ułożenie struktury macierzy
    for (let i = 0; i < costs.length; i++) {
        const row = [];
        for (let j = 0; j < costs[i].length; j++) {
            const unitCosts = costs[i][j];
            const totalProfit = sellingPrice[j] - (unitCosts + buyingPrice[i]);
            row.push({
                unitCosts,
                totalProfit,
                transportPlan: 0
            });
        }
        matrix.push(row);
    }

    console.log(matrix);

    // sprawdzenie czy podaż jest równa popytowi
    let supplyVal = 0;
    supply.forEach( num => {
      supplyVal += num;
    });

    let demandVal = 0;
    demand.forEach( num => {
      demandVal += num;
    });

    if (supplyVal !== demandVal) {
        // Dodanie dodatkowego wiersza i kolumny do matrixa oraz wypełnienie zerami zmiennych unitCosts, totalProfit, transportPlan
        const extraRow = new Array(demand.length + 1).fill({
          unitCosts: 0,
          totalProfit: 0,
          transportPlan: 0
        });
        matrix.push(extraRow);

        for (let i = 0; i < matrix.length - 1; i++) {
            matrix[i].push({
                unitCosts: 0,
                totalProfit: 0,
                transportPlan: 0
            });
        }

        demand.push(supplyVal);
        supply.push(demandVal);
    }

    console.log("Po zmianach", matrix);

    return matrix;
  }

  const resultMatrix = createMatrix(finalData);

  return (
    <section className='mainBg w-full min-h-screen flex justify-center items-center py-12'>
      <section className='md:max-w-[800px] max-w-[90%] min-w-[30%] w-full panelGlass rounded-xl border border-thirdColor shadow-2xl flex flex-col justify-start items-center p-10 gap-10'>
      { finalData ? (
        <div>
          <p>SIEMA</p>
          <pre>{JSON.stringify(resultMatrix, null, 2)}</pre>
        </div>
      ) : (
        <LoadingElement/>
      )}
      </section>
    </section>
  );
}