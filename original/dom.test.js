var DomTest = (function () {
    return {
        changeDescriptionExpectCorrectAltTag: function () {
            var element = {};
            var expectedAltTag = 'Correct description';
            Dom.changeDescription(element, expectedAltTag);
            Assert.areIdentical(expectedAltTag, element.alt);
            Assert.areIdentical(expectedAltTag, element.title);
        }
    };
}());

Enhance.discoverTests(DomTest).runTests();