class MockRepositoryTests

  this.generateMockWithExpectationMetExpectWorks = ->
    mock = MockRepository.generateMock().methods('someMethod')
    mock.expect().method('someMethod').withArguments('x', 2).returns(8).times(1)
    result = mock.someMethod('x', 2)
    mock.verifyExpectations()
    Assert.areIdentical(8, result)

  this.generateMockWithNoArgumentsExpectWorks = ->
    mock = MockRepository.generateMock().methods('someMethod')
    mock.expect().method('someMethod').returns(8).times(1)
    result = mock.someMethod('x', 2)
    mock.verifyExpectations()
    Assert.areIdentical(8, result)

  this.generateMockWithNoTimesExpectWorks = ->
    mock = MockRepository.generateMock().methods('someMethod')
    mock.expect().method('someMethod').returns(8)
    mock.someMethod('x', 2)
    result = mock.someMethod('x', 2)
    mock.verifyExpectations()
    Assert.areIdentical(8, result)

  this.generateMockWithNoReturnExpectNull = ->
    mock = MockRepository.generateMock().methods('someMethod')
    mock.expect().method('someMethod')
    mock.someMethod('x', 2)
    result = mock.someMethod('x', 2)
    mock.verifyExpectations()
    Assert.isNull(result)

  this.generateMockWithExpectationWrongParametersExpectFails = ->
    mock = MockRepository.generateMock().methods('someMethod')
    mock.expect().method('someMethod').withArguments('x', 2).returns(8).times(1)
    mock.someMethod('x', 3)
    Assert.doesThrow(mock.verifyExpectations)

  this.generateMockWithExpectationWrongNumberOfCallsExpectFails = ->
    mock = MockRepository.generateMock().methods('someMethod')
    mock.expect().method('someMethod').withArguments('x', 2).returns(8).times(1)
    mock.someMethod('x', 2)
    mock.someMethod('x', 2)
    Assert.doesThrow(mock.verifyExpectations)

  this.generateMockWithExpectationNoCallsExpectFails = ->
    mock = MockRepository.generateMock().methods('someMethod')
    mock.expect().method('someMethod').withArguments('x', 2).returns(8).times(1)
    Assert.doesThrow(mock.verifyExpectations)

  this.generateMockThatThrowsExceptionExpectException = ->
    mock = MockRepository.generateMock().methods('someMethod')
    mock.expect().method('someMethod').withArguments('a', 3).throwsException('An error').times(1)
    Assert.doesThrow(mock.someMethod, ['a', 3])

  this.generateStubWithNoVerificationExpectWorks = ->
    mock = MockRepository.generateMock().methods('someMethod')
    mock.expect().method('someMethod').withArguments('x', 2).returns(8).times(0)
    result = mock.someMethod('x', 2)
    Assert.areIdentical(8, result)

class AssertTests
  this.areIdenticalWithIdenticalNumbersExpectPass = ->
    Assert.areIdentical(2, 2)

  this.areIdenticalWithDifferentNumbersExpectFail = ->
    Assert.doesThrow(Assert.areIdentical, [2, 3])

  this.areIdenticalWithDifferentTypesExpectFail = ->
    Assert.doesThrow(Assert.areIdentical, [2, '2'])

  this.areNotIdenticalWithIdenticalNumbersExpectFail = ->
    Assert.doesThrow(Assert.areNotIdentical, [4, 4])

  this.areNotIdenticalWithDifferentNumbersExpectPass = ->
    Assert.areNotIdentical(4, 1)

  this.areNotIdenticalWithDifferentTypesExpectPass = ->
    Assert.areNotIdentical(4, '4')

  this.isTrueWithTrueExpectPass = ->
    Assert.isTrue(true)

  this.isTrueWithFalseExpectFail = ->
    Assert.doesThrow(Assert.isTrue, [false])

  this.isTrueWithStringExpectFail = ->
    Assert.doesThrow(Assert.isTrue, ['true'])

  this.isTrueWith1ExpectFail = ->
    Assert.doesThrow(Assert.isTrue, [1])

  this.isFalseWithTrueExpectPass = ->
    Assert.isFalse(false)

  this.isFalseWithFalseExpectFail = ->
    Assert.doesThrow(Assert.isFalse, [true])

  this.isFalseWithStringExpectFail = ->
    Assert.doesThrow(Assert.isFalse, ['false'])

  this.isFalseWith0ExpectFail = ->
    Assert.doesThrow(Assert.isFalse, [0])

  this.isTruthyWithTrueExpectPass = ->
    Assert.isTruthy(true)

  this.isTruthyWith1ExpectPass = ->
    Assert.isTruthy(1)

  this.isTruthyWithStringExpectPass = ->
    Assert.isTruthy('x')

  this.isTruthyWithNumberExpectPass = ->
    Assert.isTruthy(654)

  this.isTruthyWithObjectExpectPass = ->
    Assert.isTruthy({})

  this.isTruthyWith0ExpectFail = ->
    Assert.doesThrow(Assert.isTruthy, [0])

  this.isTruthyWithNullExpectFail = ->
    Assert.doesThrow(Assert.isTruthy, [null])

  this.isTruthyWithUnassignedExpectFail = ->
    Assert.doesThrow(Assert.isTruthy, [null])

  this.isTruthyWithEmptyStringExpectFail = ->
    Assert.doesThrow(Assert.isTruthy, [''])

  this.isFalseyWithFalseExpectPass = ->
    Assert.isFalsey(false)

  this.isFalseyWith0ExpectPass = ->
    Assert.isFalsey(0)

  this.isFalseyWithEmptyStringExpectPass = ->
    Assert.isFalsey('')

  this.isFalseyWithNullExpectPass = ->
    Assert.isFalsey(null)

  this.isFalseyWithTrueExpectFail = ->
    Assert.doesThrow(Assert.isFalsey, [true])

  this.isFalseyWith1ExpectFail = ->
    Assert.doesThrow(Assert.isFalsey, [1])

  this.isFalseyWithStringExpectFail = ->
    Assert.doesThrow(Assert.isFalsey, ['x'])

  this.isFalseyWithObjectExpectFail = ->
    Assert.doesThrow(Assert.isFalsey, [{}])

  this.isNullWithNullExpectPass = ->
    Assert.isNull(null)

  this.isNullWithValueExpectFail = ->
    Assert.doesThrow(Assert.isNull, [{}])

  this.containsWithMatchExpectPass = ->
    Assert.contains('Hello', 'Hello World')

  this.containsWithIncorrectCaseExpectFail = ->
    Assert.doesThrow(Assert.contains, ['Hello', 'hello world'])

  this.containsWithNoMatchCaseExpectFail = ->
    Assert.doesThrow(Assert.contains, ['Hello', 'Hi World'])

  this.notContainsWithNoMatchExpectPass = ->
    Assert.notContains('Hello', 'Hi World')

  this.notContainsWithIncorrectCaseExpectPass = ->
    Assert.notContains('Hello', 'hello World')

  this.notContainsWithMatchExpectFail = ->
    Assert.doesThrow(Assert.notContains, ['Hello', 'Hello World'])

  this.doesThrowWithExceptionExpectPass = ->
    mockFunction = ->
      throw 'Exception'
    Assert.doesThrow(mockFunction)

  this.doesThrowWithNoExceptionExpectFail = ->
    mockFunction = ->
      ''
    Assert.doesThrow(-> Assert.doesThrow(mockFunction) )

  this.failExpectFail = ->
    Assert.doesThrow(Assert.fail)

Enhance
.setLanguage(Enhance.TextEn)
.discoverTests(MockRepositoryTests)
.discoverTests(AssertTests)
.runTests();