var SampleTest = (function () {
    return {
        addTwoNumbersWith2and3Expect5: function () {
            var result = Sample.addTwoNumbers(2, 3);
            Assert.areIdentical(5, result);
        },
        addTwoNumbersWith3and3Expect6: function () {
            var result = Sample.addTwoNumbers(3, 3);
            Assert.areIdentical(6, result);
        }
    };
}());

Enhance.discoverTests(SampleTest).runTests();