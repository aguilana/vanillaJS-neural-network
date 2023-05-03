import lerp from "../utils/lerp.js";

class Sensor { // cast rays in front of the car and in different directions
    constructor(car) {
        this.car = car;
        this.rayCount = 6;
        this.rayLength = 150; // length of the ray (in pixels)
        this.raySpread = Math.PI / 2; // the spread of the rays (in radians) (45 degrees)

        this.rays = []; // array of rays (each ray is an array of two points)
        this.readings = [];
    }

    update() {
        this.#castRays();
    }

    draw(ctx) {
        // loop through rayCount
        for (let i = 0; i < this.rayCount; i++) {
            ctx.beginPath();
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.stroke();
        }

    }

    #castRays() {
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) { // loop from 0 to rayCount
            // figure out angle of each individual ray using lerp function giving us a value between start and end depending on the percentage
            const rayAngle = lerp(
                this.raySpread / 2, // remember the unit circle
                -this.raySpread / 2, // remember the unit circle
                this.rayCount === 1 ? 0.5 : i / (this.rayCount - 1) // percentage of the ray i will not be equal to the rayCount so the max value of the i is rayCount- 1
            ) + this.car.angle; // add the angle of the car to the angle of the ray

            // calculate start and end point
            const start = { x: this.car.x, y: this.car.y }
            const end = {
                x: this.car.x -
                    Math.sin(rayAngle) * this.rayLength, // scale up by ray length
                y: this.car.y -
                    Math.cos(rayAngle) * this.rayLength // scale up by ray length
            }
            this.rays.push([start, end]) // defining the segment using an array same way we use for the borders in road.js
        }
    }
}

export default Sensor;