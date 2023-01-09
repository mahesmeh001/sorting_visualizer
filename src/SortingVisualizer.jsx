import React from 'react';
import './sortingAlgos'
import './SortingVisualizer.css';
import {mergesort, quickSort} from "./sortingAlgos";
import {bubbleSort, heapSort, selectionSort} from "./sortingAlgos";

// Change this value for the speed of the animations.
let ANIMATION_SPEED_MS = 3;

// Change this value for the number of bars (value) in the array.
let NUMBER_OF_ARRAY_BARS = 100;

let array_slider=0;

// This is the main color of the array bars.
let PRIMARY_COLOR = '#00deff';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        NUMBER_OF_ARRAY_BARS = document.getElementById("Array-range").value;
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(5, 730));
        }
        this.setState({array});
    }

    descriptionManager(a){
        const Directions = document.getElementById('directions');
        Directions.style.display = "none";

        const selectionDescription = document.getElementById('selection-description');
        const bubbleDescription = document.getElementById('bubble-description');
        const heapDescription = document.getElementById('heap-description');
        const quickDescription = document.getElementById('quick-description');
        const mergeDescription = document.getElementById('merge-description');

        switch (a){
            default:
                break;
            case "m":
                mergeDescription.style.display = "block";
                quickDescription.style.display = "none";
                heapDescription.style.display = "none";
                bubbleDescription.style.display = "none";
                selectionDescription.style.display = "none";
                break;
            case "q":
                mergeDescription.style.display = "none";
                quickDescription.style.display = "block";
                heapDescription.style.display = "none";
                bubbleDescription.style.display = "none";
                selectionDescription.style.display = "none";
                break;
            case "h":
                mergeDescription.style.display = "none";
                quickDescription.style.display = "none";
                heapDescription.style.display = "block";
                bubbleDescription.style.display = "none";
                selectionDescription.style.display = "none";
                break;
            case "b":
                mergeDescription.style.display = "none";
                quickDescription.style.display = "none";
                heapDescription.style.display = "none";
                bubbleDescription.style.display = "block";
                selectionDescription.style.display = "none";
                break;
            case "s":
                mergeDescription.style.display = "none";
                quickDescription.style.display = "none";
                heapDescription.style.display = "none";
                bubbleDescription.style.display = "none";
                selectionDescription.style.display = "selection";
                break;
        }
    }


    mergeSort() {
        const animations = mergesort(this.state.array);
        this.descriptionManager("m");

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {
        const animations = quickSort(this.state.array);
        this.descriptionManager("q");
        let color_count = 0;

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            //recoloring
            if(Number(animations[i][0])===-1){
                color_count++;
                let barOneIdx = Number(animations[i][1]);
                let barTwoIdx = Number(animations[i][2]);
                let barOneStyle = arrayBars[barOneIdx].style;
                let barTwoStyle = arrayBars[barTwoIdx].style;
                let color;
                if (color_count % 2 === 1) {
                    color = SECONDARY_COLOR;
                } else {
                    color = PRIMARY_COLOR;
                }

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);

            } else {
                //is a swap animation


                //setting the height
                setTimeout(() => {

                    let barOneIdx = Number(animations[i][1]);
                    let barTwoIdx = Number(animations[i][3]);
                    let barOneNewHeight = animations[i][4];
                    let barTwoNewHeight = animations[i][2];
                    //console.log(newHeight);
                    let barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${barOneNewHeight}px`;
                    let barTwoStyle = arrayBars[barTwoIdx].style;
                    barTwoStyle.height = `${barTwoNewHeight}px`;

                }, i * ANIMATION_SPEED_MS);
            }

        }

    }

    heapSort() {
        const animations = heapSort(this.state.array);
        this.descriptionManager("h");
        let color_count = 0;

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            //recoloring
            if(Number(animations[i][0])===-1){
                color_count++;
                let barOneIdx = Number(animations[i][1]);
                let barTwoIdx = Number(animations[i][2]);
                let barOneStyle = arrayBars[barOneIdx].style;
                let barTwoStyle = arrayBars[barTwoIdx].style;
                let color;
                if (color_count % 2 === 1) {
                    color = SECONDARY_COLOR;
                } else {
                    color = PRIMARY_COLOR;
                }

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);

            } else {
                //is a swap animation


                //setting the height
                setTimeout(() => {

                    let barOneIdx = Number(animations[i][1]);
                    let barTwoIdx = Number(animations[i][3]);
                    let barOneNewHeight = animations[i][4];
                    let barTwoNewHeight = animations[i][2];
                    //console.log(newHeight);
                    let barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${barOneNewHeight}px`;
                    let barTwoStyle = arrayBars[barTwoIdx].style;
                    barTwoStyle.height = `${barTwoNewHeight}px`;

                }, i * ANIMATION_SPEED_MS);
            }

        }

    }

    bubbleSort() {
        const animations = bubbleSort(this.state.array);
        this.descriptionManager("b");

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');

            //recoloring
            if (i%4===0||i%4===1){
                let barOneIdx = Number(animations[i][0]);
                let barTwoIdx = Number(animations[i][1]);
                //let [barOneIdx, barTwoIdx] = animations[i];
                let barOneStyle = arrayBars[barOneIdx].style;
                let barTwoStyle = arrayBars[barTwoIdx].style;
                let color;
                if(i%4===0){
                    color = SECONDARY_COLOR;
                } else {
                    color = PRIMARY_COLOR;
                }

                setTimeout(()=> {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                    }, i * ANIMATION_SPEED_MS);

            }
            else if (i%4===2||i%4===3){
                //setting the height
                setTimeout(() => {
                    let barIdx = Number(animations[i][0]);
                    let newHeight = animations[i][1];
                    //console.log(newHeight);
                    let barStyle = arrayBars[barIdx].style;
                    barStyle.height = `${newHeight}px`;

                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    selectionSort(){

        const animations = heapSort(this.state.array);
        this.descriptionManager("s");
        let color_count = 0;

        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            //recoloring
            if(Number(animations[i][0])===-1){
                color_count++;
                let barOneIdx = Number(animations[i][1]);
                let barTwoIdx = Number(animations[i][2]);
                let barOneStyle = arrayBars[barOneIdx].style;
                let barTwoStyle = arrayBars[barTwoIdx].style;
                let color;
                if (color_count % 2 === 1) {
                    color = SECONDARY_COLOR;
                } else {
                    color = PRIMARY_COLOR;
                }

                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);

            } else {
                //is a swap animation


                //setting the height
                setTimeout(() => {

                    let barOneIdx = Number(animations[i][1]);
                    let barTwoIdx = Number(animations[i][3]);
                    let barOneNewHeight = animations[i][4];
                    let barTwoNewHeight = animations[i][2];
                    //console.log(newHeight);
                    let barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${barOneNewHeight}px`;
                    let barTwoStyle = arrayBars[barTwoIdx].style;
                    barTwoStyle.height = `${barTwoNewHeight}px`;

                }, i * ANIMATION_SPEED_MS);
            }

        }

    }


    render() {
        const {array} = this.state;

        return (
            <div style={{height: "200vh", backgroundColor: "#f3ffff"}}>
                <div className="top-bar">
                    <a id="generate">
                        <div onClick={() => this.resetArray()}>Generate New Array</div>
                    </a>
                    <a>
                        <div onClick={() => this.mergeSort()}>Merge Sort</div>
                    </a>
                    <a>
                        <div onClick={() => this.quickSort()}>Quick Sort</div>
                    </a>
                    <a>
                        <div onClick={() => this.heapSort()}>Heap Sort</div>
                    </a>
                    <a>
                        <div onClick={() => this.bubbleSort()}>Bubble Sort</div>
                    </a>
                    <a>
                        <div onClick={() => this.selectionSort()}>Selection Sort</div>
                    </a>

                    <div style={{float: "right"}}>
                        <h1 style={{color: "#00deff", marginRight: '30px', marginTop: '0', marginBottom: '0'}}>
                            Mehul's Sorting Visualizer
                        </h1>
                    </div>

                </div>

                <br>
                </br>

                <div className="main">
                    {/*<div className="header">*/}
                    {/*    <h1>Mehul's Sorting Visualizer</h1>*/}
                    {/*</div>*/}

                    <div id="directions">
                        <p>Click a sorting method to get started! After each sort, be sure to <u>generate a new array</u> to sort again!</p>
                    </div>


                    <div className="inputs" style={{width: "100%"}}>
                        <table style={{marginRight:"auto", marginLeft:"auto"}}>
                            <tbody>
                            <tr>
                                <td>
                                    <p>Adjust the number of elements to be sorted: </p>
                                </td>
                                <td>
                                    <input type="range" min="10" max="200" value={NUMBER_OF_ARRAY_BARS}
                                           onChange={() => this.resetArray()} id="Array-range"></input>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="array-container">
                        {array.map((value, idx) => (
                            <div className="array-bar" key={idx} style={{
                                backgroundColor: PRIMARY_COLOR,
                                height: `${value}px`,
                            }}></div>
                        ))}
                        <br>

                        </br>

                    </div>


                    {/*descriptions of the sorts*/}

                    <div id="merge-description" style={{display: "none"}}>
                        <h2>Merge Sort</h2>
                        <p>
                            Merge sort is an efficient, general-purpose, comparison-based sorting algorithm. It works by
                            dividing an array into two halves, sorting each half, and then merging the sorted halves back
                            together. Here is a high-level description of the algorithm:
                        </p>
                        <ol>
                            <li>
                                If the input array has fewer than two elements, return it as the result of the function.
                            </li>
                            <li>
                                Divide the input array into two equal-sized arrays.
                            </li>
                            <li>
                                Recursively sort the two arrays.
                            </li>
                            <li>
                                Merge the two sorted arrays into a single, sorted array.
                            </li>
                        </ol>
                        <p>
                            One of the key advantages of merge sort is that it is a "divide and conquer" algorithm, which
                            means that it is highly efficient for large input arrays. It has a time complexity of O(n*log(n)),
                            which makes it more efficient than many other sorting algorithms, such as bubble sort and
                            selection sort. Additionally, merge sort is a stable sort, which means that the order of
                            equal elements is preserved.
                        </p>
                    </div>

                    <div id="quick-description" style={{display: "none"}}>
                        <h2>Quick Sort</h2>
                        <p>
                            Quicksort is a sorting algorithm that works by selecting a "pivot" element from the array
                            and partitioning the other elements into two sub-arrays, according to whether they are less
                            than or greater than the pivot. In our case, we select the last element as the "pivot". The
                            sub-arrays are then sorted recursively. Here is a high-level description of the algorithm:
                        </p>
                        <ol>
                            <li>
                                If the input array has fewer than two elements, return it as the result of the function.
                            </li>
                            <li>
                                Select a pivot element from the array. (The last element)
                            </li>
                            <li>
                                Partition the array into two sub-arrays, according to whether the elements are less than or greater than the pivot.
                            </li>
                            <li>
                                Recursively sort the two sub-arrays.
                            </li>
                            <li>
                                Concatenate the sorted sub-arrays and the pivot element to get the sorted array.
                            </li>
                        </ol>
                        <p>
                            Quicksort is a highly efficient sorting algorithm with a time complexity of O(n*log(n)).
                            It is also an "in-place" sorting algorithm, meaning that it does not require any additional
                            memory space to sort the array. However, quicksort can be less stable than other sorting
                            algorithms, meaning that the order of equal elements is not necessarily preserved.
                        </p>
                    </div>

                    <div id="heap-description" style={{display: "none"}}>
                        <h2>Heap Sort</h2>
                        <p>
                            Heap sort is a comparison-based sorting algorithm that works by organizing the elements of
                            the input array into a special type of binary tree called a heap. The heap is then sorted by
                            repeatedly removing the largest element from the heap (the root of the heap) and adding it to
                            the end of the sorted array. Here is a high-level description of the algorithm:
                        </p>
                        <ol>
                            <li>
                                Build a max-heap from the input array.
                            </li>
                            <li>
                                Repeatedly remove the largest element from the heap and append it to the sorted array,
                                until the heap is empty.
                            </li>
                            <li>
                                Swap the root element with the last element in the heap.
                            </li>
                            <li>
                                Discard the last element of the heap, which is now sorted.
                            </li>
                            <li>
                                Rebuild the heap by sifting the new root element down to its proper position.
                            </li>
                        </ol>
                        <p>
                            Heap sort has a time complexity of O(n*log(n)), which makes it more efficient than many other
                            sorting algorithms, such as bubble sort and insertion sort. It is also an "in-place" sorting
                            algorithm, meaning that it does not require any additional memory space to sort the array.
                            However, heap sort is not a stable sort, meaning that the order of equal elements is not
                            necessarily preserved.
                        </p>
                    </div>

                    <div id="bubble-description" style={{display: "none"}}>
                        <h2>Bubble Sort</h2>
                        <p>
                            Bubble sort is a simple sorting algorithm that works by repeatedly iterating through the
                            elements of the input array and swapping adjacent elements that are out of order.
                            The algorithm repeats this process until the array is sorted.
                        </p>
                        <p>
                            Bubble sort has a time complexity of O(n^2), which makes it less efficient than many other
                            sorting algorithms, such as merge sort and quicksort. However, it is a simple algorithm that
                            is easy to understand and implement, and it can be useful in certain situations where the
                            input array is almost sorted or where the simplicity of the algorithm outweighs the need for
                            speed. Bubble sort is also a stable sort, meaning that the order of equal elements is preserved.
                        </p>
                    </div>

                    <div id="selection-description" style={{display: "none"}}>
                        <h2>Selection Sort</h2>
                        <p>
                            Selection sort is a simple sorting algorithm that works by repeatedly selecting the smallest
                            element from the unsorted portion of the array and adding it to the end of the sorted portion.
                            Here is a high-level description of the algorithm:
                        </p>
                        <ol>
                            <li>
                                Iterate through the elements of the array. For each element, find the smallest element in the unsorted portion of the array (starting with the current element).
                            </li>
                            <li>
                                Swap the current element with the smallest element found in step 1.
                            </li>
                        </ol>
                        <p>
                            Selection sort has a time complexity of O(n^2), which makes it less efficient than many other
                            sorting algorithms, such as merge sort and quicksort. However, it is a simple algorithm that
                            is easy to understand and implement, and it can be useful in certain situations where the
                            input array is almost sorted or where the simplicity of the algorithm outweighs the need for
                            speed. Selection sort is also a stable sort, meaning that the order of equal elements is preserved.
                        </p>
                    </div>


                </div>

            </div>

        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}