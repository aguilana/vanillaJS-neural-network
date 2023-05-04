import lerp from '../utils/lerp';

describe.skip('lerp function', () => {
    it('should return the start value when percent is 0', () => {
        expect(lerp(0, 10, 0)).toBe(0);
    });

    it('should return the end value when percent is 1', () => {
        expect(lerp(0, 10, 1)).toBe(10);
    });

    it('should return the correct value for a percentage between 0 and 1', () => {
        expect(lerp(0, 10, 0.5)).toBe(5);
        expect(lerp(0, 100, 0.25)).toBe(25);
        expect(lerp(-50, 50, 0.75)).toBe(25);
    });
});