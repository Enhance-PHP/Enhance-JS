var $;

var JqueryExampleTest = (function () {
    return {
        changeDescriptionExpectCorrectAltTag: function () {
            var id = 'test';
            var description = 'Test Description';

            var mock = MockRepository.generateMock([], ['attr']);
            mock.expect().method('attr').withArguments('alt', description).returns(mock).times(1);
            mock.expect().method('attr').withArguments('title', description).returns(mock).times(1);
            
            // TODO: jquery helper to do this:
            $ = function () {
                if (arguments[0] === '#test') {
                    return mock;
                }
            };

            JqueryExample.changeDescription(id, description);
            mock.verifyExpectations();
        },
        doSomethingWithAjaxExpectContentLoaded: function () {
            //var url = 'http://fake';
            //var id = 'test';

            //$ = recorderMock('get', 'html');

            //JqueryExample.doSomethingWithAjax(id, url);

            //Assert.areIdentical(url, $.get.__calls[0].arguments[0]);
        }
    };
}());

Enhance.discoverTests(JqueryExampleTest).runTests();