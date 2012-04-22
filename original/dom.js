var Dom = (function () {
    return {
        changeDescription: function (element, description) {
            element.alt = description;
            element.title = description;
        }
    };
}());