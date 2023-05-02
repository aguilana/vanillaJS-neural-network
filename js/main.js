// get a refernce to the canvas

const canvas = document.getElementById("myCanvas");

// set height
canvas.width = 200;

// have a car and want to draw on the canvas...need the drawing context
const ctx = canvas.getContext("2d");

// draw a rectangle on the canvas using the context object (ctx)
const road = new Road(canvas.width / 2, canvas.width * 0.9); // x, width, laneCount
const car = new Car(road.getLaneCenter(1), 100, 30, 50) // x, y, width of car, height of car

animate();
// update the car's position
function animate() {
    // update the car's position
    car.update();

    // canvas has a width and height property that we can use to set the canvas size
    canvas.height = window.innerHeight;

    // draw the road on the canvas
    road.draw(ctx);

    // draw the car on the canvas
    car.draw(ctx); // draw the car

    // requestAnimationFrame is a method of the window object that tells the browser to call the animate function again
    requestAnimationFrame(animate);
}