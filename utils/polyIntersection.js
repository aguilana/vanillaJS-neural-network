import getIntersection from './getIntersection.js';

function polyIntersection(poly1, poly2) {
    // loop through all points in poly 1 and see if they touch with poly 2
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            // one point of poly1 and one point of poly2 and making segments out of them from poly1[i] to poly1[i+1] and poly2[j] to poly2[j+1]
            const touch = getIntersection(
                poly1[i],
                poly1[(i + 1) % poly1.length], // if i is the last point, then i+1 is the first point of poly1 again (modulus) 
                poly2[j],
                poly2[(j + 1) % poly2.length]
            );
            if (touch) {
                return true;
            }
        }
    }
    return false;
}

export default polyIntersection;