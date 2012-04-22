Examples = (function() {
    return {
        addTwoNumbers: function(a, b) {
            return a + b;
        },
        mockExample: function (validator, value) {
            if (validator.validate(value)) {
                return validator.sanitize(value);
            }
            return validator.getErrorMessage(value);
        }
    };
}());