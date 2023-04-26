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
    for (let i = 0; i < 50; i++) {
      newArr.push(getRandom(20, 1000));
    }
    setArray(newArr);
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
    const animations = getBubbleSortAnimations(array);
    console.log("Animations Array:", animations)
    const arrayBars = document.getElementsByClassName("arrayBar");
    for (let i = 0; i < animations.length; i++) {
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        console.log("Array Bars 1st", arrayBars[barOneIdx])
        console.log("Array Bars 2st", arrayBars[barTwoIdx])
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

//  Big issue with the state render here that was causing the array to sort before the animations
//  Inside the useEffect hook, the function will only execute after the component has re-rendered
//  thus, the mergeSort function not executing immediately.
//   useEffect(() => {
//     if (isSorting) {
//       console.log("Render")
//       const animations = getMergeSortAnimations(array);
//       const arrayBars = arrayBarsRef.current;
//       console.log("Animations Array:", animations)
//       for (let i = 0; i < animations.length; i++) {
//         const isColorChange = i % 3 !== 2;
//         if (isColorChange) {
//           const [barOneIdx, barTwoIdx] = animations[i];
//           const barOneStyle = arrayBars[barOneIdx].style;
//           const barTwoStyle = arrayBars[barTwoIdx].style;
//           const color = i % 3 === 0 ? 'red' : 'green';
//           setTimeout(() => {
//             barOneStyle.backgroundColor = color;
//             barTwoStyle.backgroundColor = color;
//           }, i * 3);
//         } else {
//           setTimeout(() => {
//             const [barOneIdx, newHeight] = animations[i];
//             const barOneStyle = arrayBars[barOneIdx].style;
//             barOneStyle.height = `${newHeight}px`
//             if (i === animations.length - 1) setIsSorting(false)
//           },i * 3)
//         }
//       }
//     }
//   }, [isSorting])


  // BUBBLE SORT
  /* useLayoutEffect(() => {
      if (isSorting) {
      console.log("Render")
      const animations = getBubbleSortAnimations(array);
      console.log("Animations Array:", animations)
      const arrayBars = arrayBarsRef.current;
      console.log("Array Bars Current:", arrayBarsRef.current)
      for (let i = 0; i < animations.length; i++) {
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          console.log("Array Bars 1st", arrayBars[barOneIdx])
          console.log("Array Bars 2st", arrayBars[barTwoIdx])
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
  }, [isSorting]) */

//   function mergeSort() {
//     console.log("Merge Sort")
//     setIsSorting(true)
//   }

//   function bubbleSort() {
//     console.log("Bubble Sort")
//     if (!isSorting) setIsSorting(true)
//   }


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
    </div>
  )
}

export default SortingVisualizer;
