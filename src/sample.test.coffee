class SampleTest
  this.addTwoNumbersWith2and3Expect5 = ->
    result = Sample.addTwoNumbers(2, 3)
    Assert.areIdentical(5, result)
  this.addTwoNumbersWith3and3Expect6 = ->
    result = Sample.addTwoNumbers(3, 3)
    Assert.areIdentical(6, result)

Enhance.discoverTests(SampleTest).runTests()