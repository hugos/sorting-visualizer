import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
//import styles from '../styles/SortingVisualizer.module.css';
import {getMergeSortAnimations, getBubbleSortAnimations} from '../SortingAlgorithms';


function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  // Need to use the useRef hook because Nextjs is SSR and the style is not available immediately.
  const arrayBarsRef = useRef([]);

  function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
  }

  useEffect(() => {
    resetArray();
   // arrayBarsRef.current = array.map((value, idx) => arrayBarsRef.current[idx])
  }, [])

  const resetArray = () => {
    setIsSorting(false);
    const newArr = [];
    for (let i = 0; i < 30; i++) {
      newArr.push(getRandom(20, 1000));
    }
    setArray(newArr);
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
    setIsSorting(true)
    
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? "red" : 'turquoise';  // Update the color variable to red or purple when necessary

        setTimeout(() => {  
           barOneStyle.backgroundColor = color;
           barTwoStyle.backgroundColor = color;
        }, i * 3);
        
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeightOne] = animations[i][0];
          const [barTwoIdx, newHeightTwo] = animations[i][1];

          arrayBars[barOneIdx].style.height = `${newHeightOne}px`;
          arrayBars[barTwoIdx].style.height = `${newHeightTwo}px`;

          if (i === animations.length - 1) { 
            // After the bars are sorted, set them all to green.
            for (let j = 0; j < arrayBars.length; j++) {
              arrayBars[j].style.backgroundColor = "green";
            }
            setIsSorting(false);
          }
        },i * 3)
      }
      
  }
  // console.log(arr)
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
      <button onClick={resetArray} disabled={isSorting}>
        Generate New Array
      </button>
      <button onClick={mergeSort} disabled={isSorting}>
        Merge Sort
      </button>
      <button onClick={bubbleSort} disabled={isSorting}>
        Bubble Sort
      </button>
      <button onClick={testSortingAlgorithms} disabled={isSorting}>
        Test Sort
      </button>
    </div>
  )
}

export default SortingVisualizer;
