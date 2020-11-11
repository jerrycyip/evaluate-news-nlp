import {handleSubmit} from '../src/client/js/formHandler';
// address error "ReferenceError: regeneratorRuntime is not defined"
import "core-js/stable";
import "regenerator-runtime/runtime";

describe("Testing the submit functionality", () => {
    test("Testing the handleSubmit() function", () => {
           expect(handleSubmit).toBeDefined();
})
});