/* eslint-disable no-loop-func */
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
//import styles from '../styles/SortingVisualizer.module.css';
import {getMergeSortAnimations, getBubbleSortAnimations, getSelectionSortAnimations} from '../SortingAlgorithms';


function SortingVisualizer() {
  const [arrayLength, setArrayLength] = useState(20)
  const [array, setArray] = useState(generateArray(arrayLength));
  const [isSorting, setIsSorting] = useState(false);
  // Need to use the useRef hook because Nextjs is SSR and the style is not available immediately.
  const arrayBarsRef = useRef([]);


  function generateArray(length) {
    const newArr = [];
    for (let i = 0; i < length; i++) {
      newArr.push(getRandom(20, 1000))
    }
    return newArr;
  }


  function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  const handleSliderChange = (event) => {
    const newLength = parseInt(event.target.value);
    setArrayLength(newLength);
    setArray(generateArray(newLength))
  }

  useEffect(() => {
    resetArray();
   // arrayBarsRef.current = array.map((value, idx) => arrayBarsRef.current[idx])
  }, [])

  const resetArray = () => {
    setIsSorting(false);
    const newArr = [];
    for (let i = 0; i < 20; i++) {
      newArr.push(getRandom(20, 1000));
    }
    setArray(newArr);
    setArrayLength(newArr.length);
  }

  function testSortingAlgorithms() {
    for (let i = 0; i < 100; i++) {
      const array = [];
      const length = getRandom(20, 1000);
      for (let i = 0; i < length; i++) {
        array.push(getRandom(-1000, 1000));
      }
      const javaScriptSortedArray = array.slice().sort((a, b) => a - b);
      const mergeSortedArray = getMergeSortAnimations(array.slice());
      console.log(arraysAreEqual(javaScriptSortedArray, mergeSortedArray));
    }
  }

  function arraysAreEqual(firstArray, secondArray) {
    if (firstArray.length !== secondArray.length) return false;
    for (let i = 0; i < firstArray.length; i++) {
      if (firstArray[i] !== secondArray[i]) return false;
      return true;
    }
  }

  function mergeSort() {
    console.log("Merge Sort")
    const animations = getMergeSortAnimations(array);
    const arrayBars = arrayBarsRef.current;
        console.log("Animations Array:", animations)
      for (let i = 0; i < animations.length; i++) {
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 === 0 ? 'red' : 'green';
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * 3);
        } else {
          setTimeout(() => {
            const [barOneIdx, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIdx].style;
            barOneStyle.height = `${newHeight}px`
            if (i === animations.length - 1) setIsSorting(false)
          },i * 3)
        }
      }
  }

  function bubbleSort() {
    console.log("Bubble Sort")
    const arr = [...array];
    const animations = getBubbleSortAnimations(arr);
    const arrayBars = document.getElementsByClassName("arrayBar");
    setIsSorting(true);
    let lastSortedIndex = 0; // initialize the index of the last sorted bar
    const timeoutDuration = Math.max(30, Math.floor(3000 / array.length));

    for (let i = 0; i < animations.length; i++) {

      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : 'turquoise';

        setTimeout(() => {
           barOneStyle.backgroundColor = color;
           barTwoStyle.backgroundColor = color;
        }, i * 30);

      } else {
        setTimeout(() => {
          const [barOneIdx, newHeightOne] = animations[i][0];
          const [barTwoIdx, newHeightTwo] = animations[i][1];

          arrayBars[barOneIdx].style.height = `${newHeightOne}px`;
          arrayBars[barTwoIdx].style.height = `${newHeightTwo}px`;
          console.log("Array Bar:", arrayBars[barTwoIdx])



          // Need another timeout, otherwise the animation is too fast and will skip this code.
          // This ensures this code will be executed after a short delay (1ms)
          setTimeout(() => {
          // Change the color of the bar that has just been sorted to green after a delay
          if (barTwoIdx === arr.length - 1 - lastSortedIndex) {
              arrayBars[barTwoIdx].style.backgroundColor = "green";
              lastSortedIndex++; // update the index of the last sorted bar
          }}, 1)

          if (i === animations.length - 1) {
            // After the bars are sorted, set them all to green.
            for (let j = 0; j < arrayBars.length; j++) {
              arrayBars[j].style.backgroundColor = 'green'
            }
            setIsSorting(false);
          }
        },i * 30)
      }
  }
}


  function selectionSort() {
    const arr = [...array];
    const animations = getSelectionSortAnimations(arr);
    const arrayBars = document.getElementsByClassName("arrayBar");
    setIsSorting(true);

    const sortedIndices = [];
    const timeoutDuration = Math.max(30, Math.floor(3000 / array.length));

    for (let i = 0; i < animations.length; i++) {

      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : 'turquoise';

        setTimeout(() => {
           barOneStyle.backgroundColor = color;
           barTwoStyle.backgroundColor = color;
        }, i * 30);

      } else {
        setTimeout(() => {
          const [barOneIdx, newHeightOne] = animations[i][0];
          const [barTwoIdx, newHeightTwo] = animations[i][1];

          arrayBars[barOneIdx].style.height = `${newHeightOne}px`;
          arrayBars[barTwoIdx].style.height = `${newHeightTwo}px`;
          console.log("Array Bar:", arrayBars[barTwoIdx])

           // Check if the current bar is sorted, and add its index to sortedIndices array
        if (!sortedIndices.includes(barOneIdx) && newHeightOne <= newHeightTwo) {
          sortedIndices.push(barOneIdx);
        }
        if (!sortedIndices.includes(barTwoIdx) && newHeightTwo <= newHeightOne) {
          sortedIndices.push(barTwoIdx);
        }

        // Set the background color of sorted bars to green
        sortedIndices.forEach(idx => {
          arrayBars[idx].style.backgroundColor = "green";
        });

          if (i === animations.length - 1) {
            // After the bars are sorted, set them all to green.
            for (let j = 0; j < arrayBars.length; j++) {
              arrayBars[j].style.backgroundColor = 'green'
            }
            setIsSorting(false);
          }
        },i * 30)
      }
  }
}



  return (
    <div>
      <div className="arrayContainer">
       {array.map((value, idx) => {
         return (
           <div className="arrayBar" key={idx} ref={(el) => (arrayBarsRef.current[idx] = el)} style={{ height: `${value}px`}} />
         )
       })}
      </div>
      <input type="range" step="10" min="20" max="200" value={arrayLength} onChange={handleSliderChange}/>
      <span>{arrayLength}</span>
      <button onClick={resetArray} disabled={isSorting}>
        Generate New Array
      </button>
      <button onClick={mergeSort} disabled={isSorting}>
        Merge Sort
      </button>
      <button onClick={bubbleSort} disabled={isSorting}>
        Bubble Sort
      </button>
      <button onClick={selectionSort} disabled={isSorting}>
        Selection Sort
      </button>
      <button onClick={testSortingAlgorithms} disabled={isSorting}>
        Test Sort
      </button>
    </div>
  )
}

export default SortingVisualizer;
