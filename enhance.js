/* Enhance Test Framework v 1.0.2 */
/* http://www.stevefenton.co.uk/Content/JavaScript-Enhance-Test-Framework/ */
var document = document || {};
var console = console || {};
/* TODO: tap, xml */
var Enhance = (function () {
    'use strict';
    var tests = [], passingTests = [], failingTests = [], text = null, getKeys, register, runTests, writeResult;

    getKeys = function (object) {
        var keys = [], key;
        for (key in object) {
            if (object.hasOwnProperty(key)) {
                keys.push(key);
            }
        }
        return keys;
    };

    register = function (testMethod, name) {
        tests.push({ name: name, method: testMethod, message: '' });
    };

    runTests = function () {
        var i;
        for (i = 0; i < tests.length; i++) {
            /* Execute The Test */
            try {
                tests[i].method();
                passingTests.push(tests[i]);
            } catch (ex) {
                tests[i].message = ex;
                failingTests.push(tests[i]);
            }
        }
    };

    writeResult = function () {
        var i, title, message, container;

        title = failingTests.length === 0 ? text.testPassed : text.testFailed;
        if (document && document.title) {
            document.title = title;
        }
        /* Headlines */
        message = '<div style="background-color: White; position: absolute; top: 0; left: 0; width: 100%; height: 100%;">' +
            '<div style="border: 5px solid black; width: 90%; margin: 1em auto; padding: 1em;">' +
            '<h1>' + title + '</h1>' +
            '<p>' + text.summary
                .replace('{testCount}', tests.length)
                .replace('{passingTestCount}', passingTests.length)
                .replace('{failingTestCount}', failingTests.length) + '</p>';

        /* Failures */
        if (failingTests.length > 0) {
            message += '<p>' + text.failingTests +
                '<ul style="color: Red;">';
            for (i = 0; i < failingTests.length; i++) {
                message += '<li>' + failingTests[i].name + '<br>' + failingTests[i].message + '</li>';
            }
            message += '</ul>' +
                '</p>';
        }

        /* Successes */
        if (passingTests.length > 0) {
            message += '<p>' + text.passingTests +
                '<ul style="color: Green;">';
            for (i = 0; i < passingTests.length; i++) {
                message += '<li>' + passingTests[i].name + '</li>';
            }
            message += '</ul>' +
                '</p>';
        }

        /* Close */
        message += '</div>' +
            '</div>';

        container = document.createElement('div');
        container.innerHTML = message;
        document.body.appendChild(container);
    };

    return {
        setLanguage: function (language) {
            text = language;
            return this;
        },
        getLanguage: function () {
            return text;
        },
        discoverTests: function (object) {
            var i, keys;
            if (!text) {
                text = Enhance.TextEn;
            }
            /* Registers all methods in an object as a test */
            keys = getKeys(object);
            for (i = 0; i < keys.length; i++) {
                register(object[keys[i]], keys[i]);
            }
            return this;
        },
		runTests: function () {
			/* Run All Tests */
			runTests();
            writeResult();
            return this;
		}
	};
}());

Enhance.TextEn = (function () {
    'use strict';
    return {
        testPassed: 'Test Passed',
        testFailed: 'Test Failed',
        summary: '{testCount} Tests Ran - {passingTestCount} passed, {failingTestCount} failed.',
        failingTests: 'Failing Tests',
        passingTests: 'Passing Tests',
        actualError: '{method} failed: actual: {actual}',
        expectedActualError: '{method} failed: expected: {expected}, actual: {actual}',
        doesThowError: '{method} failed as method did not throw: method: {delegate}, arguments: {arguments}',
        failError: '{method} forces test failure'
    };
}());

Enhance.Expectation = function () {
    'use strict';

    return {
        methodName: '',
        methodArguments: [],
        returnValue: null,
        returnException: false,
        expectedCalls: -1,
        actualCalls: 0,
        expectArguments: false,
        expectTimes: false,
        type: 'method',
        text: {},
        matches: function (method, args) {
            var i;
            if (method !== this.methodName) {
                return false;
            }

            if (this.expectArguments) {
                if (args.length !== this.methodArguments.length) {
                    return false;
                }
                for (i = 0; i < this.methodArguments.length; i++) {
                    if (args[i] !== this.methodArguments[i]) {
                        return false;
                    }
                }
            }
            return true;
        },
        called: function () {
            if (!this.actualCalls) {
                this.actualCalls = 0;
            }
            this.actualCalls = this.actualCalls + 1;

            if (this.returnException) {
                throw this.returnValue;
            }
            return this.returnValue;
        },
        method: function (methodName) {
            this.type = 'method';
            this.methodName = methodName;
            return this;
        },
        getProperty: function (propertyName) {
            this.type = 'getProperty';
            this.methodName = propertyName;
            return this;
        },
        setProperty: function (propertyName) {
            this.type = 'setProperty';
            this.methodName = propertyName;
            return this;
        },
        withArguments: function () {
            this.expectArguments = true;
            this.methodArguments = arguments;
            return this;
        },
        returns: function (returnValue) {
            this.returnValue = returnValue;
            return this;
        },
        throwsException: function (message) {
            this.returnValue = message;
            this.returnException = true;
            return this;
        },
        times: function (expectedCalls) {
            this.expectTimes = true;
            this.expectedCalls = expectedCalls;
            return this;
        },
        verify: function () {
            if (this.expectTimes) {
                if (this.expectedCalls !== this.actualCalls) {
                    return false;
                }
            }
            return true;
        }
    };
};

var MockRepository = (function () {
    'use strict';
    var i;

    return {
        generateMock: function () {
            return (function () {
                var mockExpectations = [],
                    addMethod;

                addMethod = function (mock, name) {
                    mock[name] = function () {
                        var i;
                        if (console) {
                            console.log(name + ' was called with ' + arguments.length + ' arguments');
                        }
                        for (i = 0; i < mockExpectations.length; i++) {
                            if (mockExpectations[i].matches(name, arguments)) {
                                return mockExpectations[i].called();
                            }
                        }
                    };
                };

                return {
                    methods: function () {
                        for (i = 0; i < arguments.length; i++) {
                            addMethod(this, arguments[i]);
                        }
                        return this;
                    },
                    expect: function () {
                        var expectation = new Enhance.Expectation();
                        mockExpectations.push(expectation);
                        return expectation;
                    },
                    verifyExpectations: function () {
                        for (i = 0; i < mockExpectations.length; i++) {
                            if (!mockExpectations[i].verify()) {
                                throw 'EXPECTATION FAIL: TODO: Message';
                            }
                        }
                    }

                };
            }());
        }
    };
}());

var Assert = (function () {
    'use strict';
    var getExpectedActualErrorMessage, getActualErrorMessage, getDoesThrowErrorMessage, getFailErrorMessage;

    getExpectedActualErrorMessage = function (method, expected, actual) {
        return Enhance.getLanguage().expectedActualError
            .replace('{method}', method)
            .replace('{expected}', expected)
            .replace('{actual}', actual);
    };

    getActualErrorMessage = function (method, actual) {
        return Enhance.getLanguage().actualError
            .replace('{method}', method)
            .replace('{actual}', actual);
    };

    getDoesThrowErrorMessage = function (method, delegate, args) {
        return Enhance.getLanguage().doesThowError
            .replace('{method}', method)
            .replace('{delegate}', delegate)
            .replace('{arguments}', args.join(','));
    };

    getFailErrorMessage = function (method) {
        return Enhance.getLanguage().failError
            .replace('{method}', method);
    };

    return {
        areIdentical: function (expected, actual) {
            if (expected !== actual) {
                throw getExpectedActualErrorMessage('areIdentical', expected, actual);
            }
        },
        areNotIdentical: function (expected, actual) {
            if (expected === actual) {
                throw getExpectedActualErrorMessage('areNotIdentical', expected, actual);
            }
        },
        isTrue: function (actual) {
            if (actual !== true) {
                throw getActualErrorMessage('isTrue', actual);
            }
        },
        isFalse: function (actual) {
            if (actual !== false) {
                throw getActualErrorMessage('isFalse', actual);
            }
        },
        isTruthy: function (actual) {
            if (!actual) {
                throw getActualErrorMessage('isTruthy', actual);
            }
        },
        isFalsey: function (actual) {
            if (actual) {
                throw getActualErrorMessage('isFalsey', actual);
            }
        },
        isNull: function (actual) {
            if (actual != null) {
                throw getActualErrorMessage('isNull', actual);
            }
        },
        contains: function (expected, actual) {
            if (actual.indexOf(expected) < 0) {
                throw getExpectedActualErrorMessage('contains', expected, actual);
            }
        },
        notContains: function (expected, actual) {
            if (actual.indexOf(expected) > -1) {
                throw getExpectedActualErrorMessage('notContains', expected, actual);
            }
        },
        doesThrow: function (method, args) {
            var isThrown = false;
            try {
                if (args) {
                    method.apply(this, args);
                } else {
                    method();
                }
            } catch (ex) {
                isThrown = true;
            }

            if (!isThrown) {
                throw getDoesThrowErrorMessage('doesThrow', method, args);
            }
        },
        fail: function () {
            throw getFailErrorMessage('fail');
        }
    };
}());
