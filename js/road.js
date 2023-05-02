
class Road {
    constructor(x, width, laneCount = 3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;

        this.left = x - width / 2;
        this.right = x + width / 2;

        const infinity = 2000000;
        this.top = -infinity;
        this.bottom = infinity;
    }

    draw(ctx) {
        // set the width of the line
        ctx.lineWidth = 5;
        // set the color of the line
        ctx.strokeStyle = "white";

        // for loop to draw the lanes on the canvas
        for (let i = 0; i <= this.laneCount; i++) {
            // need to find the x position of the lane using linear interpolation
            // get values of left and right according to percetage of lane. last value is going to be between 0 and 1
            const x = lerp(this.left, this.right, i / this.laneCount);
            // add dashes to the middle of each lane
            if (i > 0 && i < this.laneCount) {
                // set the line dash
                ctx.setLineDash([20, 20]); // 20 pixels of line, 20 pixels of space
                // set the line dash offset
            } else {
                ctx.setLineDash([0, 0]); // 0 pixels of line, 0 pixels of space
            }
            // draw the left line
            ctx.beginPath();
            // moveTo is a method of the context object (ctx) to move the pen to a point
            ctx.moveTo(x, this.top);
            // lineTo is a method of the context object (ctx) to draw a line to a point
            ctx.lineTo(x, this.bottom);
            // stroke is a method of the context object (ctx) to draw the line
            ctx.stroke();

        }
    }

    // method to check the center of a given lane
    getLaneCenter(laneIndex) { // from left to right starting at 0
        const laneWidth = this.width / this.laneCount; // width of each lane
        return this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * laneWidth; // left + half of the width of the lane + the index of the lane * the width of the lane
    }

    // method to check the lane of a given x position
    getLane(x) {
        return Math.floor(lerp(0, this.laneCount, (x - this.left) / (this.right - this.left)));
    }

    // method to check if a given x position is in the road
    isInRoad(x) {
        return x >= this.left && x <= this.right;
    }

    // method to check if a given y position is in the road
    isInRoadY(y) {
        return y >= this.top && y <= this.bottom;
    }

    // method to check if a given x and y position is in the road
    isInRoadXY(x, y) {
        return this.isInRoad(x) && this.isInRoadY(y);
    }

    // method to check if a given x and y position is in the road and in a given lane
    isInLane(x, y, lane) {
        return this.isInRoadXY(x, y) && this.getLane(x) === lane;
    }

    // method to put a car in a given lane
    putInLane(car, lane) {
        car.x = this.getLaneCenter(lane);
    }

}