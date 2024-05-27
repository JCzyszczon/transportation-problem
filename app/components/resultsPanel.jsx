"use client";
import React from 'react'
import LoadingElement from './loadingElement';
import TitleComponent from './titleComponent';

function ResultsPanel({ resultsData }) {

    const resultMatrix = createMatrix(resultsData);
    console.log(resultMatrix);

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
                    transportPlan: 0,
                    isFictitious: false,
                });
            }
            matrix.push(row);
        }
    
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
            // Dodanie dodatkowego wierszu i kolumny do macierzy oraz wypełnienie zerami zmiennych unitCosts, totalProfit, transportPlan
            const extraRow = Array.from({ length: demand.length + 1 }, () => ({
              unitCosts: 0,
              totalProfit: 0,
              transportPlan: 0,
              isFictitious: true,
            }));
            matrix.push(extraRow);
    
            for (let i = 0; i < matrix.length - 1; i++) {
                matrix[i].push({
                    unitCosts: 0,
                    totalProfit: 0,
                    transportPlan: 0,
                    isFictitious: true,
                });
            }
    
            demand.push(supplyVal);
            supply.push(demandVal);
            sellingPrice.push(0);
            buyingPrice.push(0);
        }
    
        for (let i = 0; i < matrix.length; i++) {
          while (supply[i] > 0) {
              // Znajdowanie indeksu kolumny z największą wartością totalProfit
              let maxProfitIndex = -1;
              let maxProfit = -Infinity;
              for (let j = 0; j < matrix[i].length; j++) {
                  if (demand[j] > 0 && matrix[i][j].totalProfit > maxProfit && !matrix[i][j].isFictitious) {
                    maxProfit = matrix[i][j].totalProfit;
                    maxProfitIndex = j;
                  }
              }
    
              // Jeśli nie znaleziono prawdziwego odbiorcy, to szuka wśród fikcyjnych
              if (maxProfitIndex === -1) {
                for (let j = 0; j < matrix[i].length; j++) {
                  if (demand[j] > 0 && matrix[i][j].totalProfit >= maxProfit) {
                    maxProfitIndex = j;
                    break;
                  }
                }
              }
    
              // Jeżeli nie ma więcej popytu
              if (maxProfitIndex === -1) break;
    
              // Rozdzielenie zasobów
              const supplyAmount = supply[i];
              const demandAmount = demand[maxProfitIndex];
    
              if (demandAmount <= supplyAmount) {
                  matrix[i][maxProfitIndex].transportPlan = demandAmount;
                  supply[i] -= demandAmount;
                  demand[maxProfitIndex] = 0;
              } else {
                  matrix[i][maxProfitIndex].transportPlan = supplyAmount;
                  demand[maxProfitIndex] -= supplyAmount;
                  supply[i] = 0;
              }
          }
        }
    
        const finalMatrix = optimizeMatrix(matrix);
    
        return finalMatrix;
    }
    
    function optimizeMatrix(matrix) {
        const rows = matrix.length;
        const cols = matrix[0].length;
      
        // Inicjalizacja tablic alfa i beta
        const alfa = new Array(rows).fill(null);
        const beta = new Array(cols).fill(null);
      
        // Zaczęcie od ostatniego wiersza
        alfa[rows - 1] = 0;
      
        // Przypisanie wartości do tablicy beta dla ostatniego wiersza
        for (let j = 0; j < cols; j++) {
          if (matrix[rows - 1][j].transportPlan > 0) {
            beta[j] = matrix[rows - 1][j].totalProfit - alfa[rows - 1];
          }
        }
      
        // Przypisanie wartości do pozostałych wierszy
        let changed = true;
        while (changed) {
          changed = false;
      
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
              if (matrix[i][j].transportPlan > 0) {
                if (alfa[i] !== null && beta[j] === null) {
                  beta[j] = matrix[i][j].totalProfit - alfa[i];
                  changed = true;
                } else if (alfa[i] === null && beta[j] !== null) {
                  alfa[i] = matrix[i][j].totalProfit - beta[j];
                  changed = true;
                }
              }
            }
          }
        }
      
        // Utworzenie macierzy sprawdzającej optymalizację
        const checkMatrix = Array.from({ length: rows }, () => new Array(cols).fill(0));
      
        // Wypełnienie macierzy odpowiednimi wartościami
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            if (matrix[i][j].transportPlan > 0) {
              checkMatrix[i][j] = 0;
            } else {
              checkMatrix[i][j] = matrix[i][j].totalProfit - alfa[i] - beta[j];
            }
          }
        }
      
        // Znalezienie największej wartości w macierzy
        let value = null;
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            if (checkMatrix[i][j] > value) {
              value = checkMatrix[i][j];
            }
          }
        }
      
        // Sprawdzenie czy największa wartość jest większa od 0
        if (value > 0) {
          // Wykonanie przesunięcia
          const maxPos = findMaxValueInMatrix(checkMatrix);
          const path = obliczPrzesuniecie(checkMatrix, maxPos);
          const smallestTransportPlan = findSmallestTransportPlan(matrix, path);
      
          // Rozpisanie nowej propozycji rozwiazania
          const adjustedMatrix = adjustTransportPlan(matrix, path, smallestTransportPlan);
      
          // Rekursyjne wywołanie funkcji na zaktualizowanej macierzy
          return optimizeMatrix(adjustedMatrix);
        } else {
          // Zwrócenie zoptymalizowanej macierzy
          return matrix;
        }
    }
    
    function findMaxValueInMatrix(matrix) {
        let maxVal = -Infinity;
        let maxPos = { row: -1, col: -1 };
    
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (matrix[i][j] > maxVal) {
                    maxVal = matrix[i][j];
                    maxPos = { row: i, col: j };
                }
            }
        }
    
        return maxPos;
    }
    
    /*function obliczPrzesuniecie(matrix, startPos) {
        const { col, row } = startPos;
    
        const directions = [
          { dr: -1, dc: 0 },
          { dr: 0, dc: 1 },
          { dr: 1, dc: 0 },
          { dr: 0, dc: -1 }
        ];
    
        const foundZeros = [];
    
        function isValidPosition(r, c) {
          return r >= 0 && r < matrix.length && c >= 0 && c < matrix[0].length;
        }
    
        function findZerosInDirection(row, col, dr, dc) {
          const zeros = [];
    
          while (isValidPosition(row, col)) {
              if (matrix[row][col] === 0) {
                zeros.push({ row, col });
              }
              row += dr;
              col += dc;
          }
    
            return zeros;
        }
    
        for (const direction of directions) {
          const { dr, dc } = direction;
          const zeros = findZerosInDirection(row, col, dr, dc);
          foundZeros.push(...zeros);
        }
    
        // Drugi krok algorytmu
        const successorsLists = [];
        for (const zero of foundZeros) {
          const { row, col } = zero;
    
          const successors = [];
    
          for (const direction of directions) {
            const { dr, dc } = direction;
            const zeros = findZerosInDirection(row + dr, col + dc, dr, dc);
            successors.push(...zeros);
          }
    
          successorsLists.push(successors);
        }
    
        // Znalezienie wspólnych punktów
        const { commonPoints, foundPoints } = findCommonPointsWithFoundPoints(successorsLists, foundZeros);
    
        // Wyznaczenie ścieżki
        const path = [];
        let currentPoint = { row, col };
    
        // Dodanie punktu startowego do ścieżki
        path.push(currentPoint);
    
        // Dodanie pierwszego przypadku
        path.push(foundPoints[0]);
    
        // Dodanie punktu wspólnego
        for (const commonPoint of commonPoints) {
          path.push(commonPoint);
        }
    
        path.push(foundPoints[1]);
    
        return path;
    }*/

    function obliczPrzesuniecie(matrix, startPos) {
        const { col, row } = startPos;
    
        const directions = [
            { dr: -1, dc: 0 },
            { dr: 0, dc: 1 },
            { dr: 1, dc: 0 },
            { dr: 0, dc: -1 }
        ];
    
        const foundZeros = [];
    
        function isValidPosition(r, c) {
            return r >= 0 && r < matrix.length && c >= 0 && c < matrix[0].length;
        }
    
        function findZerosInDirection(row, col, dr, dc) {
            const zeros = [];
    
            while (isValidPosition(row, col)) {
                if (matrix[row][col] === 0) {
                    zeros.push({ row, col });
                }
                row += dr;
                col += dc;
            }
    
            return zeros;
        }
    
        for (const direction of directions) {
            const { dr, dc } = direction;
            const zeros = findZerosInDirection(row, col, dr, dc);
            foundZeros.push(...zeros);
        }
    
        // Drugi krok algorytmu
        const successorsLists = [];
        for (const zero of foundZeros) {
            const { row, col } = zero;
    
            const successors = [];
    
            for (const direction of directions) {
                const { dr, dc } = direction;
                const zeros = findZerosInDirection(row + dr, col + dc, dr, dc);
                successors.push(...zeros);
            }
    
            successorsLists.push(successors);
        }
    
        // Znalezienie wspólnych punktów
        const { commonPoints, foundPoints } = findCommonPointsWithFoundPoints(successorsLists, foundZeros);
    
        // Wyznaczenie ścieżki
        const path = [];
        let currentPoint = { row, col };
    
        // Dodanie punktu startowego do ścieżki
        path.push(currentPoint);
    
        // Dodanie pierwszego przypadku
        if (foundPoints.length > 0) {
            path.push(foundPoints[0]);
    
            // Dodanie punktu wspólnego
            for (const commonPoint of commonPoints) {
                path.push(commonPoint);
            }
    
            if (foundPoints.length > 1) {
                path.push(foundPoints[1]);
            }
        }
    
        return path;
    }

    function findCommonPointsWithFoundPoints(successorsLists, foundZeros) {
        const commonPointsSet = new Set();
        const foundPointsMapping = [];
    
        for (let i = 0; i < successorsLists.length; i++) {
            const successors = successorsLists[i];
            for (const point of successors) {
                if (successorsLists.filter(list => list.some(p => p.row === point.row && p.col === point.col)).length > 1) {
                    commonPointsSet.add(`${point.row},${point.col}`);
                    foundPointsMapping.push(i);
                }
            }
        }
    
        const commonPoints = Array.from(commonPointsSet).map(point => {
            const [row, col] = point.split(',');
            return { row: parseInt(row), col: parseInt(col) };
        });
    
        const foundPoints = foundPointsMapping.map(index => foundZeros[index]);
    
        return { commonPoints, foundPoints };
    }

    function findSmallestTransportPlan(matrix, path) {
        let smallestTransportPlan = Infinity;
      
        // Iteracja po indeksach w path
        for (let i = 1; i < path.length; i += 2) {
          if (path[i]) { // Sprawdzenie, czy path[i] jest zdefiniowane
            const { row, col } = path[i];
            const transportPlan = matrix[row][col].transportPlan;
            // Aktualizacja najmniejszej wartości
            if (transportPlan < smallestTransportPlan) {
              smallestTransportPlan = transportPlan;
            }
          }
        }
      
        return smallestTransportPlan;
    }
    
    function adjustTransportPlan(matrix, path, smallestTransportPlan) {
        const adjustedMatrix = JSON.parse(JSON.stringify(matrix));
      
        // Iterujacja po indeksach w path
        for (let i = 0; i < path.length; i++) {
            if(path[i]) {
                const { row, col } = path[i];
                const transportPlan = matrix[row][col].transportPlan;
      
                // Modyfikacja wartości transportPlan
                adjustedMatrix[row][col].transportPlan = i % 2 === 0 ? transportPlan + smallestTransportPlan : transportPlan - smallestTransportPlan;
            }
        }
      
        return adjustedMatrix;
    }

    function calculateTotalProfit(matrix) {
        let totalProfit = 0;
    
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const cell = matrix[i][j];
                totalProfit += cell.totalProfit * cell.transportPlan;
            }
        }
    
        return totalProfit;
    }

    function calculateTotalIncome(matrix, sellingPrice) {
        let totalIncome = 0;
    
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (!matrix[i][j].isFictitious) {
                    const transportPlan = matrix[i][j].transportPlan;
                    const sellingValue = sellingPrice[j];
                    totalIncome += transportPlan * sellingValue;
                }
            }
        }
    
        return totalIncome;
    }

    function calculateTotalTransport(matrix) {
        let totalCost = 0;
    
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                const cell = matrix[i][j];
                totalCost += cell.transportPlan * cell.unitCosts;
            }
        }
    
        return totalCost;
    }

    function calculateTotalBuy(matrix, buyingPrice) {
        let totalBuy = 0;
    
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[i].length; j++) {
                if (!matrix[i][j].isFictitious) {
                    const transportPlan = matrix[i][j].transportPlan;
                    const buyingValue = buyingPrice[i];
                    totalBuy += transportPlan * buyingValue;
                }
            }
        }
    
        return totalBuy;
    }

    return (
        <>
        {resultMatrix ? (
            <>
                <TitleComponent titleText={"Final results"} titleSize={2} titleType={1}/>
                <section className='w-full flex flex-col justify-center items-start gap-2'>
                    <div className='w-full border-b-2 px-4 bg-white rounded-2xl gap-2 py-4 flex flex-col justify-center items-start relative overflow-hidden'>
                        <h3 className="uppercase font-extrabold sm:text-xs text-[10px] tracking-widest">Total cost:</h3>
                        <p>{`${calculateTotalTransport(resultMatrix)} + ${calculateTotalBuy(resultMatrix, resultsData.buyingPrice)} = ${calculateTotalTransport(resultMatrix) + calculateTotalBuy(resultMatrix, resultsData.buyingPrice)}`}</p>
                        <span className='absolute bg-red-400 w-[10px] right-0 top-0 h-full'></span>
                    </div>
                    <div className='w-full border-b-2 px-4 bg-white rounded-2xl gap-2 py-4 flex flex-col justify-center items-start relative overflow-hidden'>
                        <h3 className="uppercase font-extrabold sm:text-xs text-[10px] tracking-widest">Income:</h3>
                        <p>{calculateTotalIncome(resultMatrix, resultsData.sellingPrice)}</p>
                        <span className='absolute bg-yellow-400 w-[10px] right-0 top-0 h-full'></span>
                    </div>
                    <div className='w-full border-b-2 px-4 bg-white rounded-2xl gap-2 py-4 flex flex-col justify-center items-start relative overflow-hidden'>
                        <h3 className="uppercase font-extrabold sm:text-xs text-[10px] tracking-widest">Profit:</h3>
                        <p>{calculateTotalProfit(resultMatrix)}</p>
                        <span className='absolute bg-green-400 w-[10px] right-0 top-0 h-full'></span>
                    </div>
                </section>
            </>
        ) : (
            <LoadingElement/>
        )}
        </>
    )
}

export default ResultsPanel