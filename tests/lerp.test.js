import lerp from '../utils/lerp';


const lerpsToTest = [{ name: 'lerp1', fn: lerp }, { name: 'lerp2', fn: lerp }, { name: 'lerp3', fn: lerp }, { name: 'lerp4', fn: lerp }, { name: 'lerp5', fn: lerp },];

lerpsToTest.forEach((lerpToTest) => {
    describe(`${lerpToTest.name} function`, () => {
        it('should return the start value when percent is 0', () => {
            expect(lerpToTest.fn(0, 10, 0)).toBe(0);
        });

        it('should return the end value when percent is 1', () => {
            expect(lerpToTest.fn(0, 10, 1)).toBe(10);
        });

        it('should return the correct value for a percentage between 0 and 1', () => {
            expect(lerpToTest.fn(0, 10, 0.5)).toBe(5);
            expect(lerpToTest.fn(0, 100, 0.25)).toBe(25);
            expect(lerpToTest.fn(-50, 50, 0.75)).toBe(25);
            expect(lerpToTest.fn(-50, 50, 0.5)).toBe(0);
            expect(lerpToTest.fn(200, 650, 0.5)).toBe(425);
        });
    });
});