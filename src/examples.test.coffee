class ExamplesTest
  this.addTwoNumbersWith2and3Expect5 = ->
    result = Examples.addTwoNumbers 2, 3
    Assert.areIdentical 5, result
    null

Enhance.discoverTests(ExamplesTest).runTests();