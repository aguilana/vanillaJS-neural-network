import lerp from "../utils/lerp.js";
import getIntersection from "../utils/getIntersection.js";

class Sensor { // cast rays in front of the car and in different directions
    constructor(car) {
        this.car = car;
        this.rayCount = 4;
        this.rayLength = 150; // length of the ray (in pixels)
        this.raySpread = Math.PI / 2; // the spread of the rays (in radians) (45 degrees)

        this.rays = []; // array of rays (each ray is an array of two points)
        this.readings = []; // values for each array telling if there is a border or not
    }

    update(roadBorders, traffic) {
        this.#castRays();
        this.readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(
                this.#getReading(
                    this.rays[i],
                    roadBorders,
                    traffic)
            );
        }

    }


    #getReading(ray, roadBorders, traffic) {
        let touches = [];

        // loop through the borders
        for (let i = 0; i < roadBorders.length; i++) {
            // figure out where the sensor touches the border

            // 3 things from this function: the x, y and offset
            const touch = getIntersection(
                ray[0], ray[1],
                roadBorders[i][0],
                roadBorders[i][1]
            );
            // if the sensor touches the border, push the touch to the touches array
            if (touch) {
                touches.push(touch);
            }
        }

        // loop through the traffic
        for (let i = 0; i < traffic.length; i++) {
            // figure out where the sensor touches the border
            const poly = traffic[i].polygon;
            for (let j = 0; j < poly.length; j++) {
                const value = getIntersection(
                    ray[0], ray[1],
                    poly[j], poly[(j + 1) % poly.length]
                );
                if (value) {
                    touches.push(value);
                }
            }
        }

        // if there are no touches, return null as there is no reading and no encounter with the border
        if (touches.length === 0) {
            return null;
        } else {
            const offsets = touches.map(el => el.offset)
            // want to know from all offsets the minimum offset the nearest border
            const minOffset = Math.min(...offsets); // spread operator to spread the array into individual arguments
            return touches.find(el => el.offset === minOffset) // find the touch with the minimum offset
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

    draw(ctx) {
        // loop through rayCount
        for (let i = 0; i < this.rayCount; i++) {
            let end = this.rays[i][1];
            if (this.readings[i]) {
                end = this.readings[i]; // essentially passing the x and y of the reading to the end of the ray
            }

            ctx.beginPath();
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = "yellow";
            ctx.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();

            ctx.beginPath();
            ctx.lineWidth = 2.5;
            ctx.strokeStyle = "black";
            ctx.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
        }

    }
}

export default Sensor;