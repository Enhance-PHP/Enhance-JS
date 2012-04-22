ExamplesTest = (function() {
    return {
        addTwoNumbersWith2and3Expect5: function() {
            var result = Examples.addTwoNumbers(2, 3);
            Assert.areIdentical(5, result);
        },
        addTwoNumbersWith3and3Expect6: function() {
            var result = Examples.addTwoNumbers(3, 3);
            Assert.areIdentical(6, result);
        },
        mockExample: function () {
            var testValue = 'example input';
            var expectedOutput = 'output';
            var mockValidator = MockRepository.generateMock().methods('validate', 'sanitize');
            mockValidator.expect().method('validate').withArguments(testValue).returns(true).times(1);
            mockValidator.expect().method('sanitize').withArguments(testValue).returns(expectedOutput).times(1);

            var result = Examples.mockExample(mockValidator, testValue);

            Assert.areIdentical(expectedOutput, result);
            mockValidator.verifyExpectations();
        }
    };
})();

Enhance.discoverTests(ExamplesTest).runTests();