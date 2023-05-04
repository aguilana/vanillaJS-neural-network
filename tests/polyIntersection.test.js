import polyIntersection from "../utils/polyIntersection";


describe('polyIntersection function', () => {
    // test the polyIntersection function
    it('polyIntersection function returns true if two polygons intersect', () => {
        const poly1 = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 0, y: 5 }
        ];
        const poly2 = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 0, y: 5 }
        ];

        expect(polyIntersection(poly1, poly2)).toBe(true);
    }
    );

    it('polyIntersection function returns false if two polygons do not intersect', () => {
        const poly1 = [
            { x: 0, y: 0 },
            { x: 5, y: 5 },
            { x: 0, y: 5 }
        ];
        const poly2 = [
            { x: 6, y: 0 },
            { x: 8, y: 2 },
            { x: 6, y: 2 }
        ];

        expect(polyIntersection(poly1, poly2)).toBe(false);
    }
    );
});
