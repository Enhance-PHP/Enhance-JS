var EnhanceTests = (function() {
    return {

    };
}());

var MockRepositoryTests = (function () {
    return {
        generateMockWithExpectationMetExpectWorks: function () {
            var mock = MockRepository.generateMock([], ['someMethod']);
            mock.expect().method('someMethod').withArguments('x', 2).returns(8).times(1);
            var result = mock.someMethod('x', 2);
            mock.verifyExpectations();
            Assert.areIdentical(8, result);
        },
        generateMockWithNoArgumentsExpectWorks: function () {
            var mock = MockRepository.generateMock([], ['someMethod']);
            mock.expect().method('someMethod').returns(8).times(1);
            var result = mock.someMethod('x', 2);
            mock.verifyExpectations();
            Assert.areIdentical(8, result);
        },
        generateMockWithNoTimesExpectWorks: function () {
            var mock = MockRepository.generateMock([], ['someMethod']);
            mock.expect().method('someMethod').returns(8);
            mock.someMethod('x', 2);
            var result = mock.someMethod('x', 2);
            mock.verifyExpectations();
            Assert.areIdentical(8, result);
        },
        generateMockWithNoReturnExpectNull: function () {
            var mock = MockRepository.generateMock([], ['someMethod']);
            mock.expect().method('someMethod');
            mock.someMethod('x', 2);
            var result = mock.someMethod('x', 2);
            mock.verifyExpectations();
            Assert.isNull(result);
        },
        generateMockWithExpectationWrongParametersExpectFails: function () {
            var mock = MockRepository.generateMock([], ['someMethod']);
            mock.expect().method('someMethod').withArguments('x', 2).returns(8).times(1);
            mock.someMethod('x', 3);
            Assert.doesThrow(mock.verifyExpectations);
        },
        generateMockWithExpectationWrongNumberOfCallsExpectFails: function () {
            var mock = MockRepository.generateMock([], ['someMethod']);
            mock.expect().method('someMethod').withArguments('x', 2).returns(8).times(1);
            mock.someMethod('x', 2);
            mock.someMethod('x', 2);
            Assert.doesThrow(mock.verifyExpectations);
        },
        generateMockWithExpectationNoCallsExpectFails: function () {
            var mock = MockRepository.generateMock([], ['someMethod']);
            mock.expect().method('someMethod').withArguments('x', 2).returns(8).times(1);
            Assert.doesThrow(mock.verifyExpectations);
        },
        generateMockThatThrowsExceptionExpectException: function () {
            var mock = MockRepository.generateMock([], ['someMethod']);
            mock.expect().method('someMethod').withArguments('a', 3).throwsException('An error').times(1);
            Assert.doesThrow(mock.someMethod, ['a', 3]);
        },
        generateStubWithNoVerificationExpectWorks: function () {
            var mock = MockRepository.generateMock([], ['someMethod']);
            mock.expect().method('someMethod').withArguments('x', 2).returns(8).times(0);
            var result = mock.someMethod('x', 2);
            Assert.areIdentical(8, result);
        }
    };
}());

var AssertTests = (function() {
    return {
        areIdenticalWithIdenticalNumbersExpectPass: function () {
            Assert.areIdentical(2, 2);
        },
        areIdenticalWithDifferentNumbersExpectFail: function () {
            Assert.doesThrow(Assert.areIdentical, [2, 3]);
        },
        areIdenticalWithDifferentTypesExpectFail: function () {
            Assert.doesThrow(Assert.areIdentical, [2, '2']);
        },
        areNotIdenticalWithIdenticalNumbersExpectFail: function () {
            Assert.doesThrow(Assert.areNotIdentical, [4, 4]);
        },
        areNotIdenticalWithDifferentNumbersExpectPass: function () {
            Assert.areNotIdentical(4, 1);
        },
        areNotIdenticalWithDifferentTypesExpectPass: function () {
            Assert.areNotIdentical(4, '4');
        },
        isTrueWithTrueExpectPass: function () {
            Assert.isTrue(true);
        },
        isTrueWithFalseExpectFail: function () {
            Assert.doesThrow(Assert.isTrue, [false]);
        },
        isTrueWithStringExpectFail: function () {
            Assert.doesThrow(Assert.isTrue, ['true']);
        },
        isTrueWith1ExpectFail: function () {
            Assert.doesThrow(Assert.isTrue, [1]);
        },
        isFalseWithTrueExpectPass: function () {
            Assert.isFalse(false);
        },
        isFalseWithFalseExpectFail: function () {
            Assert.doesThrow(Assert.isFalse, [true]);
        },
        isFalseWithStringExpectFail: function () {
            Assert.doesThrow(Assert.isFalse, ['false']);
        },
        isFalseWith0ExpectFail: function () {
            Assert.doesThrow(Assert.isFalse, [0]);
        },
        isTruthyWithTrueExpectPass: function () {
            Assert.isTruthy(true);
        },
        isTruthyWith1ExpectPass: function () {
            Assert.isTruthy(1);
        },
        isTruthyWithStringExpectPass: function () {
            Assert.isTruthy('x');
        },
        isTruthyWithNumberExpectPass: function () {
            Assert.isTruthy(654);
        },
        isTruthyWithObjectExpectPass: function () {
            Assert.isTruthy({});
        },
        isTruthyWith0ExpectFail: function () {
            Assert.doesThrow(Assert.isTruthy, [0]);
        },
        isTruthyWithNullExpectFail: function () {
            Assert.doesThrow(Assert.isTruthy, [null]);
        },
        isTruthyWithUnassignedExpectFail: function () {
            var unassigned;
            Assert.doesThrow(Assert.isTruthy, [unassigned]);
        },
        isTruthyWithEmptyStringExpectFail: function () {
            Assert.doesThrow(Assert.isTruthy, ['']);
        },
        isFalseyWithFalseExpectPass: function () {
            Assert.isFalsey(false);
        },
        isFalseyWith0ExpectPass: function () {
            Assert.isFalsey(0);
        },
        isFalseyWithEmptyStringExpectPass: function () {
            Assert.isFalsey('');
        },
        isFalseyWithUnassignedExpectPass: function () {
            var unassigned;
            Assert.isFalsey(unassigned);
        },
        isFalseyWithTrueExpectFail: function () {
            Assert.doesThrow(Assert.isFalsey, [true]);
        },
        isFalseyWith1ExpectFail: function () {
            Assert.doesThrow(Assert.isFalsey, [1]);
        },
        isFalseyWithStringExpectFail: function () {
            Assert.doesThrow(Assert.isFalsey, ['x']);
        },
        isFalseyWithObjectExpectFail: function () {
            Assert.doesThrow(Assert.isFalsey, [{}]);
        },
        isNullWithNullExpectPass: function () {
            Assert.isNull(null);
        },
        isNullWithValueExpectFail: function () {
            Assert.doesThrow(Assert.isNull, [{}]);
        },
        containsWithMatchExpectPass: function () {
            Assert.contains('Hello', 'Hello World');
        },
        containsWithIncorrectCaseExpectFail: function () {
            Assert.doesThrow(Assert.contains, ['Hello', 'hello world']);
        },
        containsWithNoMatchCaseExpectFail: function () {
            Assert.doesThrow(Assert.contains, ['Hello', 'Hi World']);
        },
        notContainsWithNoMatchExpectPass: function () {
            Assert.notContains('Hello', 'Hi World');
        },
        notContainsWithIncorrectCaseExpectPass: function () {
            Assert.notContains('Hello', 'hello World');
        },
        notContainsWithMatchExpectFail: function () {
            Assert.doesThrow(Assert.notContains, ['Hello', 'Hello World']);
        },
        doesThrowWithExceptionExpectPass: function () {
            Assert.doesThrow(function () { throw 'Exception'; });
        },
        doesThrowWithNoExceptionExpectFail: function () {
            Assert.doesThrow(function () { Assert.doesThrow(function () { return; }) });
        },
        failExpectFail: function () {
            Assert.doesThrow(Assert.fail);
        }
    };
}());

Enhance
    .setLanguage(Enhance.TextEn)
    .discoverTests(EnhanceTests)
    .discoverTests(MockRepositoryTests)
    .discoverTests(AssertTests)
    .runTests();