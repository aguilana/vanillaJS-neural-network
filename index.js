import Road from "./js/road.js";
import Car from "./js/car.js";
import Visualizer from "./js/visualizer.js";
import NeuralNetwork from "./js/network.js";

// get a refernce to the canvas
const carCanvas = document.getElementById("carCanvas");

const networkCanvas = document.getElementById("networkCanvas");
// set height
carCanvas.width = 200;
networkCanvas.width = 300;

// have a car and want to draw on the canvas...need the drawing context
const carCtx = carCanvas.getContext("2d");
const networkCtx = networkCanvas.getContext("2d");

// draw a rectangle on the canvas using the context object (ctx)
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9); // x, width, laneCount

// grab the number selected in the dropdown
let carAmt = document.getElementById("carAmt");
let mutation = document.getElementById("mutation");
carAmt.value = localStorage.getItem('carAmt') || 1;
mutation.value = localStorage.getItem('mutation') || 0.5;

carAmt.addEventListener("change", (e) => {
    console.log("carAmt", e.target.value);
    localStorage.setItem("carAmt", e.target.value);
});

mutation.addEventListener("change", (e) => {
    console.log("mutation", e.target.value);
    localStorage.setItem("mutation", e.target.value);
});


console.log("carAmt", carAmt.value)
const N = Number(carAmt.value); // number of cars
console.log("N", N)
const cars = generateCars(N)

let bestCar = cars[0]; // set to first car at first
if (localStorage.getItem('bestBrain')) {
    // loop through cars and set the brain to the best brain
    for (let i = 0; i < cars.length; i++) {
        cars[i].brain = JSON.parse(localStorage.getItem('bestBrain'))
        // condition if car is not 0
        if (i !== 0) {
            NeuralNetwork.mutate(cars[i].brain, Number(mutation.value))
        }
    }
} else {
    bestCar.brain = cars[0].brain;
}

// createing traffic of an array of cars
// const traffic = [
//     new Car(road.getLaneCenter(1), -100, 30, 50, "DUMMY", 2)
// ]
const traffic = [];
new Array(10).fill(0).forEach((_, i) => {
    traffic.push(new Car(road.getLaneCenter(Math.floor(Math.random() * 3)), Math.floor(-Math.random() * 1500), 30, 50, "DUMMY", Math.random() * 2.8))
})

animate();

// save our car data
function saveState() {
    const confirm = window.confirm("Are you sure you want to save this car's data?")
    if (!confirm) return
    localStorage.setItem('bestBrain', JSON.stringify(bestCar.brain))
}

function discardState() {
    const confirm = window.confirm("Are you sure you want to discard the neural networks data? If you do this you will lose all your progress on the trained neural network.")
    if (!confirm) return
    localStorage.removeItem('bestBrain')
}

// event listener for the save button and discard button
document.getElementById('saveBtn').addEventListener('click', saveState)
document.getElementById('discardBtn').addEventListener('click', discardState)
document.getElementById('refreshBtn').addEventListener('click', reset)

function reset() {
    window.location.reload()
}

// define function called generate cars that accepts number of cars as a parameter
function generateCars(numberOfCars) {
    // create an empty array to hold the cars
    const cars = [];
    // loop through the number of cars
    for (let i = 1; i <= numberOfCars; i++) {
        // create a new car and push it into the array
        cars.push(new Car(road.getLaneCenter(1), 100, 15, 40, "AI")); // x, y, width of car, height of car
    }
    // return the array of cars
    return cars;
}

// update the car's position
function animate(time) {
    // loop through the traffic and tell each to update and keep in mind the road borders
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }

    // update the car's position
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic); // borders added to the car's update method to keep the car on the road. traffic added to the car's update method to keep the car from crashing into other cars
    }
    // find the best car
    bestCar = cars.find(car => car.y === Math.min(...cars.map(car => car.y)))
    // canvas has a width and height property that we can use to set the canvas size
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;


    // before drawing the road, we will save the current context state
    carCtx.save();
    // want to focus on the best car! or one with the minumum y value
    carCtx.translate(0, -bestCar.y + carCanvas.height * 0.8); // translate the canvas to the center of the car where we want the center to be positioned
    // draw the road on the canvas
    road.draw(carCtx);

    // draw the traffic on the canvas
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carCtx, "red");
    }
    carCtx.globalAlpha = 0.2
    // draw the car on the canvas
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carCtx, "blue"); // draw the car and added color for our car
    }
    carCtx.globalAlpha = 1
    bestCar.draw(carCtx, "blue", true); // draw the car and added color for our car

    networkCtx.lineDashOffset = -time / 50
    Visualizer.drawNetwork(networkCtx, bestCar.brain);
    // requestAnimationFrame is a method of the window object that tells the browser to call the animate function again
    requestAnimationFrame(animate);
}