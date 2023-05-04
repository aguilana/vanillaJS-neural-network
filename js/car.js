import Controls from './controls.js'
import Sensor from './sensors.js';
import polyIntersection from '../utils/polyIntersection.js';

class Car {
    constructor(x, y, width, height, controlType, maxSpeed = 3) {
        // the car is a rectangle with a center point (x, y) and a width and height
        this.x = x;
        this.y = y;
        this.width = width; // width of car to store in the object
        this.height = height; // height of car to store in the object

        this.speed = 0; // speed attribute of car to store in the object
        this.acceleration = 0.5; // acceleration attribute of car to store in the object
        this.maxSpeed = maxSpeed; // maxSpeed attribute of car to store in the object
        this.friction = 0.05; // friction attribute of car to store in the object
        this.angle = 0; // angle attribute of car to store in the object

        this.damaged = false // damaged attribute of car to store in the object

        if (controlType !== "DUMMY") {
            this.sensor = new Sensor(this); // passing the car instance to the sensor class
        }

        this.controls = new Controls(controlType);



        this.polyIntersection = polyIntersection;
    }

    // draw method to draw the car on the canvas using the context object (ctx) passed in as a parameter to the draw method
    draw(ctx) {
        /*         // save the current context state
                // this code was used PRIOR to creating the polygon!
                ctx.save();
        
                // translate the canvas to the center of the car where we want the center to be positioned
                ctx.translate(this.x, this.y);
        
                // rotate the canvas by the angle of the car
                ctx.rotate(-this.angle);
        
                // begin Path to draw a rectangle on the canvas
                ctx.beginPath();
        
                // set the color of the rectangle
                ctx.fillStyle = "darkred";
        
                // rect is a method of the context object (ctx) to draw a rectangle
                ctx.rect(
                    -this.width / 2, // x is the center of the car
                    -this.height / 2, // y is the center of the car
                    this.width,
                    this.height
                )
        
                // ask context to fill
                ctx.fill();
        
                // restore the context to the saved state
                ctx.restore(); */

        // logic to change color of car if damaged
        if (this.damaged) {
            ctx.fillStyle = 'gray'
        } else {
            ctx.fillStyle = 'black'
        }
        // in addition to drawing the car we need to tell the sensor to draw itself
        ctx.beginPath();
        ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
        // now loop through remaining points
        for (let i = 1; i < this.polygon.length; i++) {
            ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        ctx.fill();

        if (this.sensor) {

            this.sensor.draw(ctx);
        }

    }

    // update method to update the car's position
    update(roadBorder, traffic) {
        if (!this.damaged) {
            this.#moveCar();

            // want to update the points after we move the car
            this.polygon = this.#createPolygon() // create a polygon for the car

            this.damaged = this.#assessDamage(roadBorder, traffic) // assess damage to the car}
        }
        if (this.sensor) {
            this.sensor.update(roadBorder, traffic);
        }
    }

    #assessDamage(roadBorder, traffic) {
        // loop through all the border and check if there is an intersection between polygon and road border of i then return true
        // else return false
        for (let i = 0; i < roadBorder.length; i++) {
            if (this.polyIntersection(this.polygon, roadBorder[i])) {
                return true;
            }
        }
        for (let i = 0; i < traffic.length; i++) {
            if (this.polyIntersection(this.polygon, traffic[i].polygon)) {
                return true;
            }
        }
        return false;
    }

    #createPolygon() {
        // 1 point per corner of the car and can always add points for shapes
        const points = []
        // figure out radius
        const radius = Math.hypot(this.width, this.height) / 2 // only need half of the width and height
        const alpha = Math.atan2(this.width, this.height)
        // with two above we can add our first point

        // we can change the shape by altering the angle of the car
        points.push({ // top right point
            x: this.x - Math.sin(this.angle - alpha) * radius,
            y: this.y - Math.cos(this.angle - alpha) * radius
        }
        )
        points.push({ // top left point
            x: this.x - Math.sin(this.angle + alpha) * radius,
            y: this.y - Math.cos(this.angle + alpha) * radius
        }
        )
        points.push({ // bottom left point
            x: this.x - Math.sin(Math.PI + this.angle - alpha) * radius,
            y: this.y - Math.cos(Math.PI + this.angle - alpha) * radius
        }
        )
        points.push({ // bottom right point
            x: this.x - Math.sin(Math.PI + this.angle + alpha) * radius,
            y: this.y - Math.cos(Math.PI + this.angle + alpha) * radius
        }
        )
        return points
    }

    #moveCar() {
        // increase the speed of the car by the acceleration
        if (this.controls.up) {
            this.speed += this.acceleration;
        }

        // decrease/reverse the speed of the car by the acceleration
        if (this.controls.down) {
            this.speed -= this.acceleration;
        }

        // if the speed is greater than the maxSpeed, set the speed to the maxSpeed
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }

        // if the speed is less than the maxSpeed, set the speed to the (negative) maxSpeed
        if (this.speed < -this.maxSpeed / 1.15) {
            this.speed = -this.maxSpeed / 1.15;
        }

        // if the speed is greater than 0, decrease the speed by the friction
        if (this.speed > 0) {
            this.speed -= this.friction;
        }

        // if the speed is less than 0, increase the speed by the friction
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        // to fic the friction issue we need to write some math
        // if the speed is less than the friction, set the speed to 0
        // if the absolute value of the speed is less than the friction, set the speed to 0
        // remember, the absolute value of a number is the number without the sign | -5 | = 5
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }

        // check if speed is 0 and if it is, set the angle to 0
        // has to be !== because speed can also be negative so can't be > 0
        if (this.speed !== 0) {
            // value of flip is 1 or -1 depending on the sign of the speed
            const flip = this.speed > 0 ? 1 : -1;

            // implement the left and right controls
            if (this.controls.left) {
                // this angle works according to the unit circle
                this.angle += 0.03 * flip;
            }

            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }

        // move the Y according to the angle
        this.y -= this.speed * Math.cos(this.angle); // need to scale the angle by the speed

        // move the X according to the angle
        this.x -= this.speed * Math.sin(this.angle); // need to scale the angle by the speed

        // console.table(this.speed)
    }

}

export default Car;
