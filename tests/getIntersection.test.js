
import getIntersection from '../utils/getIntersection'

describe('getIntersection function', () => {
    // test the getIntersection function
    it('getIntersection function returns expected intersection point', () => {
        const A = { x: 0, y: 0 };
        const B = { x: 5, y: 5 };
        const C = { x: 0, y: 5 };
        const D = { x: 5, y: 0 };

        expect(getIntersection(A, B, C, D)).toEqual({ x: 2.5, y: 2.5, offset: 0.5 });
    });

    it('getIntersection function returns null if no intersection', () => {
        const A = { x: 0, y: 0 };
        const B = { x: 5, y: 5 };
        const C = { x: 6, y: 0 };
        const D = { x: 8, y: 2 };

        expect(getIntersection(A, B, C, D)).toBeNull();
    })
});