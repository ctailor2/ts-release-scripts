import execute from '../execute';

describe('executor', () => {
    it('echoes out', () => {
        const sh = jest.fn();

        execute({ sh });

        expect(sh).toHaveBeenCalledWith('echo "Hello World"');
    });
});