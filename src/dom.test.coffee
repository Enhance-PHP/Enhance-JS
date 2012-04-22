class DomTest
  this.changeDescriptionExpectCorrectAltTag = ->
    element = {}
    expected = 'Correct Description'
    Dom.changeDescription(element, expected)
    Assert.areIdentical(expected, element.alt)
    Assert.areIdentical(expected, element.title)

Enhance.discoverTests(DomTest).runTests();