root = exports ? this

root.$

class JqueryExampleTest
  this.changeDescriptionExpectCorrectAltTag = ->
    id = 'test'
    description = 'Test Description'
    idTestMock = MockRepository.generateJqueryMock('$', '#test').methods('attr')
    idTestMock.expect().method('attr').withArguments('alt', description).returns(idTestMock).times(1)
    idTestMock.expect().method('attr').withArguments('title', description).returns(idTestMock).times(1)

    classListMock = MockRepository.generateJqueryMock('$', '.list').methods('width')
    classListMock.expect().method('width').returns(321).times(1)

    JqueryExample.changeDescription(id, description)

    idTestMock.verifyExpectations()
    classListMock.verifyExpectations()

Enhance.discoverTests(JqueryExampleTest).runTests();