import {validateInput} from '../src/client/js/formValidator';


describe("Testing the url validation functionality", () => {
    test("Testing the validInput() function", () => {
        const testURL = 'https://www.cnn.com/';
        expect(validateInput(testURL)).toBe(true);
    });
});