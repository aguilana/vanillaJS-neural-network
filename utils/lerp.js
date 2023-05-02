// lerp function to find the x position of the lane
function lerp(start, end, percent) {
    // 0 and 1 just gives the 2 points
    return start + (end - start) * percent; // when percent is 0, return start. when percent is 1, return end
}

module.exports = lerp;
// export the lerp function