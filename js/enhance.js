// Generated by CoffeeScript 1.3.1
(function() {
  var root;

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Enhance = (function() {
    var failingTests, getKeys, passingTests, register, runTests, tests, text, writeResult;

    Enhance.name = 'Enhance';

    function Enhance() {}

    tests = [];

    passingTests = [];

    failingTests = [];

    text = null;

    getKeys = function(object) {
      var key, keys;
      keys = [];
      for (key in object) {
        if (object.hasOwnProperty(key)) {
          keys.push(key);
        }
      }
      return keys;
    };

    register = function(testMethod, name) {
      return tests.push({
        name: name,
        method: testMethod,
        message: ""
      });
    };

    runTests = function() {
      var i, _results;
      i = void 0;
      i = 0;
      _results = [];
      while (i < tests.length) {
        try {
          tests[i].method();
          passingTests.push(tests[i]);
        } catch (ex) {
          tests[i].message = ex;
          failingTests.push(tests[i]);
        }
        _results.push(i++);
      }
      return _results;
    };

    writeResult = function() {
      var container, i, message, title;
      i = void 0;
      title = (failingTests.length === 0 ? text.testPassed : text.testFailed);
      if (document.title) {
        document.title = title;
      }
      message = "<div style=\"background-color: White; position: absolute; top: 0px; left: 0px; width: 100%; height: 100%;\">" + "<div style=\"border: 5px solid black; width: 90%; margin: 1em auto; padding: 1em;\">" + "<h1>" + title + "</h1>" + "<p>" + text.summary.replace("{testCount}", tests.length).replace("{passingTestCount}", passingTests.length).replace("{failingTestCount}", failingTests.length) + "</p>";
      if (failingTests.length > 0) {
        message += "<p>" + text.failingTests + "<ul style=\"color: Red;\">";
        i = 0;
        while (i < failingTests.length) {
          message += "<li>" + failingTests[i].name + "<br>" + failingTests[i].message + "</li>";
          i++;
        }
        message += "</ul>" + "</p>";
      }
      if (passingTests.length > 0) {
        message += "<p>" + text.passingTests + "<ul style=\"color: Green;\">";
        i = 0;
        while (i < passingTests.length) {
          message += "<li>" + passingTests[i].name + "</li>";
          i++;
        }
        message += "</ul>" + "</p>";
      }
      message += "</div>" + "</div>";
      container = document.createElement("div");
      container.innerHTML = message;
      return document.body.appendChild(container);
    };

    Enhance.prototype.setLanguage = function(language) {
      text = language;
      return this;
    };

    Enhance.prototype.getLanguage = function() {
      return text;
    };

    Enhance.prototype.discoverTests = function(object) {
      var i, keys;
      if (!text) {
        text = Enhance.TextEn;
      }
      keys = getKeys(object);
      i = 0;
      while (i < keys.length) {
        register(object[keys[i]], keys[i]);
        i++;
      }
      return this;
    };

    Enhance.prototype.runTests = function() {
      runTests();
      writeResult();
      return this;
    };

    return Enhance;

  })();

  root.Enhance.TextEn = (function() {

    TextEn.name = 'TextEn';

    function TextEn() {}

    TextEn.prototype.testPassed = "Test Passed";

    TextEn.prototype.testFailed = "Test Failed";

    TextEn.prototype.summary = "{testCount} Tests Ran - {passingTestCount} passed, {failingTestCount} failed.";

    TextEn.prototype.failingTests = "Failing Tests";

    TextEn.prototype.passingTests = "Passing Tests";

    TextEn.prototype.actualError = "{method} failed: actual: {actual}";

    TextEn.prototype.expectedActualError = "{method} failed: expected: {expected}, actual: {actual}";

    TextEn.prototype.doesThowError = "{method} failed as method did not throw: method: {delegate}, arguments: {arguments}";

    TextEn.prototype.failError = "{method} forces test failure";

    return TextEn;

  })();

  root.Expectation = function() {
    var actualCalls, expectArguments, expectTimes, expectedCalls, methodArguments, methodName, returnException, returnValue, text, type;
    methodName = void 0;
    methodArguments = void 0;
    returnValue = null;
    returnException = false;
    expectedCalls = -1;
    actualCalls = 0;
    expectArguments = false;
    expectTimes = false;
    type = "method";
    text = void 0;
    return {
      matches: function(method, args) {
        var i;
        i = void 0;
        if (method !== this.methodName) {
          return false;
        }
        if (this.expectArguments) {
          if (args.length !== this.methodArguments.length) {
            return false;
          }
          i = 0;
          while (i < this.methodArguments.length) {
            if (args[i] !== this.methodArguments[i]) {
              return false;
            }
            i++;
          }
        }
        return true;
      },
      called: function() {
        if (!this.actualCalls) {
          this.actualCalls = 0;
        }
        this.actualCalls = this.actualCalls + 1;
        if (this.returnException) {
          throw this.returnValue;
        }
        return this.returnValue;
      },
      method: function(methodName) {
        this.type = "method";
        this.methodName = methodName;
        return this;
      },
      getProperty: function(propertyName) {
        this.type = "getProperty";
        this.methodName = propertyName;
        return this;
      },
      setProperty: function(propertyName) {
        this.type = "setProperty";
        this.methodName = propertyName;
        return this;
      },
      withArguments: function() {
        this.expectArguments = true;
        this.methodArguments = arguments;
        return this;
      },
      returns: function(returnValue) {
        this.returnValue = returnValue;
        return this;
      },
      throwsException: function(message) {
        this.returnValue = message;
        this.returnException = true;
        return this;
      },
      times: function(expectedCalls) {
        this.expectTimes = true;
        this.expectedCalls = expectedCalls;
        return this;
      },
      verify: function() {
        if (this.expectTimes) {
          if (this.expectedCalls !== this.actualCalls) {
            return false;
          }
        }
        return true;
      }
    };
  };

  root.MockRepository = (function() {
    var i;

    MockRepository.name = 'MockRepository';

    function MockRepository() {}

    i = void 0;

    MockRepository.prototype.generateMock = function() {
      var mock;
      mock = (function() {
        var addMethod, mockCalls, mockExpectations, mockRegisterCall, mockRegisterExpectation;
        mockExpectations = [];
        mockCalls = [];
        mockRegisterExpectation = function() {};
        mockRegisterCall = function() {};
        addMethod = function(mock, name) {
          return mock[name] = function() {
            i = void 0;
            if (console) {
              console.log(name + " was called with " + arguments.length + " arguments");
            }
            i = 0;
            while (i < mockExpectations.length) {
              if (mockExpectations[i].matches(name, arguments)) {
                return mockExpectations[i].called();
              }
              i++;
            }
          };
        };
        return {
          methods: function() {
            i = 0;
            while (i < arguments.length) {
              addMethod(this, arguments[i]);
              i++;
            }
            return this;
          },
          expect: function() {
            var expectation;
            expectation = new Expectation();
            mockExpectations.push(expectation);
            return expectation;
          },
          verifyExpectations: function() {
            var _results;
            i = 0;
            _results = [];
            while (i < mockExpectations.length) {
              if (!mockExpectations[i].verify()) {
                throw "EXPECTATION FAIL: TODO: Message";
              }
              _results.push(i++);
            }
            return _results;
          }
        };
      });
      return mock;
    };

    return MockRepository;

  })();

  root.Assert = (function() {
    var getActualErrorMessage, getDoesThrowErrorMessage, getExpectedActualErrorMessage, getFailErrorMessage;

    Assert.name = 'Assert';

    function Assert() {}

    getExpectedActualErrorMessage = function(method, expected, actual) {
      return Enhance.getLanguage().expectedActualError.replace("{method}", method).replace("{expected}", expected).replace("{actual}", actual);
    };

    getActualErrorMessage = function(method, actual) {
      return Enhance.getLanguage().actualError.replace("{method}", method).replace("{actual}", actual);
    };

    getDoesThrowErrorMessage = function(method, delegate, args) {
      return Enhance.getLanguage().doesThowError.replace("{method}", method).replace("{delegate}", delegate).replace("{arguments}", args.join(","));
    };

    getFailErrorMessage = function(method) {
      return Enhance.getLanguage().failError.replace("{method}", method);
    };

    Assert.prototype.areIdentical = function(expected, actual) {
      if (expected !== actual) {
        throw getExpectedActualErrorMessage("areIdentical", expected, actual);
      }
    };

    Assert.prototype.areNotIdentical = function(expected, actual) {
      if (expected === actual) {
        throw getExpectedActualErrorMessage("areNotIdentical", expected, actual);
      }
    };

    Assert.prototype.isTrue = function(actual) {
      if (actual !== true) {
        throw getActualErrorMessage("isTrue", actual);
      }
    };

    Assert.prototype.isFalse = function(actual) {
      if (actual !== false) {
        throw getActualErrorMessage("isFalse", actual);
      }
    };

    Assert.prototype.isTruthy = function(actual) {
      if (!actual) {
        throw getActualErrorMessage("isTruthy", actual);
      }
    };

    Assert.prototype.isFalsey = function(actual) {
      if (actual) {
        throw getActualErrorMessage("isFalsey", actual);
      }
    };

    Assert.prototype.isNull = function(actual) {
      if (actual != null) {
        throw getActualErrorMessage("isNull", actual);
      }
    };

    Assert.prototype.contains = function(expected, actual) {
      if (actual.indexOf(expected) < 0) {
        throw getExpectedActualErrorMessage("contains", expected, actual);
      }
    };

    Assert.prototype.notContains = function(expected, actual) {
      if (actual.indexOf(expected) > -1) {
        throw getExpectedActualErrorMessage("notContains", expected, actual);
      }
    };

    Assert.prototype.doesThrow = function(method, args) {
      var isThrown;
      isThrown = false;
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
        throw getDoesThrowErrorMessage("doesThrow", method, args);
      }
    };

    Assert.prototype.fail = function() {
      throw getFailErrorMessage("fail");
    };

    return Assert;

  })();

}).call(this);
