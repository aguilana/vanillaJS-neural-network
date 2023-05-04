import Road from "./js/road.js";
import Car from "./js/car.js";
// get a refernce to the canvas
const canvas = document.getElementById("myCanvas");

// set height
canvas.width = 200;

// have a car and want to draw on the canvas...need the drawing context
const ctx = canvas.getContext("2d");

// draw a rectangle on the canvas using the context object (ctx)
const road = new Road(canvas.width / 2, canvas.width * 0.9); // x, width, laneCount
const car = new Car(road.getLaneCenter(1), 100, 30, 50, "KEYS") // x, y, width of car, height of car

// createing traffic of an array of cars
const traffic = [
    new Car(road.getLaneCenter(0), -100, 30, 50, "DUMMY", 2),
    new Car(road.getLaneCenter(1), -200, 30, 50, "DUMMY", 1.2),
    new Car(road.getLaneCenter(2), -500, 20, 40, "DUMMY", 2),
    new Car(road.getLaneCenter(0), -150, 20, 40, "DUMMY", 0),
]

animate();
// update the car's position
function animate() {
    // loop through the traffic and tell each to update and keep in mind the road borders
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders);
    }

    // update the car's position
    car.update(road.borders); // borders added to the car's update method to keep the car on the road

    // canvas has a width and height property that we can use to set the canvas size
    canvas.height = window.innerHeight;

    // before drawing the road, we will save the current context state
    ctx.save();
    ctx.translate(0, -car.y + canvas.height * 0.8); // translate the canvas to the center of the car where we want the center to be positioned
    // draw the road on the canvas
    road.draw(ctx);

    // draw the traffic on the canvas
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(ctx);
    }
    // draw the car on the canvas
    car.draw(ctx); // draw the car

    // requestAnimationFrame is a method of the window object that tells the browser to call the animate function again
    requestAnimationFrame(animate);
}