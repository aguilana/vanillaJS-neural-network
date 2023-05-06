import getRGBA from "../utils/getRGBA";


describe('getRGBA', () => {
    it('should return a string', () => {
        expect(typeof getRGBA(0)).toBe('string');
    });

    it('should return "rgba(0, 255, 0, 0.5)" when passed 0.5', () => {
        expect(getRGBA(0.5)).toBe('rgba(0, 255, 0, 0.5)');
    });

    it('should return "rgba(255, 0, 0, 0.25)" when passed -0.25', () => {
        expect(getRGBA(-0.25)).toBe('rgba(255, 0, 0, 0.25)');
    });

    it('should return "rgba(255, 255, 255, 1)" when passed 1', () => {
        expect(getRGBA(1)).toBe('rgba(255, 255, 255, 1)');
    });

    it('should return "rgba(0, 0, 255, 0)" when passed 0', () => {
        expect(getRGBA(0)).toBe('rgba(0, 0, 255, 0)');
    });
});